import AWS from "aws-sdk";
import {success, failure} from "./libs/response-lib";
import config from "./config.js";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  AWS
    .config
    //.update({ region: config.ec2.region });
    .update({ region: data.region });

  const ec2 = new AWS.EC2();

  // set response headers to enable cors.
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  
  // Get the instance status and return it.
  ec2.describeInstances({
    InstanceIds: [ data.instanceId ]
  }, function(err, data) {
    if (err) {
      callback(null, failure({ status: false }));
    } else {
      callback(null, success(data));
    }
  })
}
