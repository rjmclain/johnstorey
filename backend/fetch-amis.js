import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  AWS
    .config
    .update({ region: data.region });

  const ec2 = new AWS.EC2();

  // Set response headers to enable CORS.
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  ec2.describeImages({
    Owners: [ "self" ],
    Filters: data.filters,
  }, function (err, data) {
    if (err) {
      callback(null, failure({ status: false }));
    } else {
      callback(null, success(data));
    }
  });
}