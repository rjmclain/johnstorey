import { CognitoUserPool } from "amazon-cognito-identity-js";
import AWS from "aws-sdk";
import config from "../config";
import sigV4Client from "./sigV4Client";

export async function authUser() {
  if (
    AWS.config.credentials &&
    Date.now() < AWS.config.credentials.expireTime - 60000
  ) {
    return true;
  }

  const currentUser = getCurrentUser();

  if (currentUser === null) {
    return false;
  }

  const userToken = await getUserToken(currentUser);

  await getAwsCredentials(userToken);

  return true;
}

export function signOutUser() {
  const currentUser = getCurrentUser();

  if (currentUser !== null) {
    currentUser.signOut();
  }
}

function getUserToken(currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function(err, session) {
      if (err) {
        reject(err);
        return;
      }
      resolve(session.getIdToken().getJwtToken());
    });
  });
}

function getCurrentUser() {
  const userPool = new CognitoUserPool({
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
  });
  return userPool.getCurrentUser();
}

function getAwsCredentials(userToken) {
  const authenticator = `cognito-idp.${config.cognito
    .REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

  AWS.config.update({ region: config.cognito.REGION });

  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
    Logins: {
      [authenticator]: userToken
    }
  });

  return AWS.config.credentials.getPromise();
}

export async function invokeApig({
  path,
  method = "GET",
  headers = {},
  queryParams = {},
  body
}) {
  if (!await authUser()) {
    throw new Error("User is not logged in");
  }

  // console.log("invokeApig path", path);
  // console.log("invokeApig body", body);

  const newClient = sigV4Client.newClient({
    accessKey: AWS.config.credentials.accessKeyId,
    secretKey: AWS.config.credentials.secretAccessKey,
    sessionToken: AWS.config.credentials.sessionToken,
    region: config.apiGateway.REGION,
    endpoint: config.apiGateway.URL
  });

  const signedRequest = newClient.signRequest({
    method,
    path,
    headers,
    queryParams,
    body
  });

  body = body ? JSON.stringify(body) : body;
  headers = signedRequest.headers;

  const results = await fetch(signedRequest.url, {
    method,
    headers,
    body
  });

  // console.log("apig results", results);

  if (results.status !== 200) {
    throw new Error(await results.text());
  }

  let data = await results.json();
  return data;
}
