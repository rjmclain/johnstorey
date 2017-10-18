import AWS from "aws-sdk";
import {success, failure} from "./libs/response-lib";
import config from "./config.js";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  AWS
    .config
    .update({region: data.region});
  const ec2 = new AWS.EC2();

  // Set response headers to enable CORS.
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  // Stop the instance.
  ec2.startInstances({ InstanceIds: [ data.instanceId ]},
      function(err,data) {
        if (err !== null) {
         callback(null, failure({status: false}));
        } else {
          callback(null, success(data));
        }
      });
}
