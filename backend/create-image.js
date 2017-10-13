import AWS from "aws-sdk";
import {success, failure} from "./libs/response-lib";
import config from "./config.js";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  AWS
    .config
    .update({region: "us-east-1"});
  const ec2 = new AWS.EC2();

  // Set response headers to enable CORS.
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
          // Set params for snapshot.
console.log("creating image");
const params = {
  InstanceId: data.instanceId,
  /* required */
  Name: data.amiName,
  /* required */
  Description: data.amiDescription
};

  ec2.createImage(params, function (err, data) {
    if (err) {
      callback(null, failure({status: false}));
    } else {
      callback(null, success(data));
    }
  });
}
