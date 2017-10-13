import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

export function main(event, context, callback) {
  var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

  // Set response headers to enable CORS.
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  ec2.describeRegions({}, function (err, data) {
    if (err) {
      callback(null, failure({ status: false }));
    } else {
      callback(null, success(data.Regions));
    }
  });
}