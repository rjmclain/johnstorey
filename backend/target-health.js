import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";
import config from "./config.js";

AWS
  .config
  .update({region: "us-east-1"});

export function main(event, context, callback) {
  const elbv2 = new AWS.ELBv2();

  // Set response headers to enable CORS.
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  elbv2.describeTargetHealth({
    TargetGroupArn: config.ec2.TARGET_GROUP
  }, function (err, data) {
    if (err) {
      callback(null, failure({ status: false }));
    } else {
      callback(null, success(data));
    }
  });
}