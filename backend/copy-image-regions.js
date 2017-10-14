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

  var params = {
    Name: data.destName,/* required */
    SourceImageId: data.srcAMI, /* required */
    SourceRegion: data.srcRegion, /* required */
    Description: data.destDescription,
    DryRun: false,
    Encrypted: false,
  };

  console.log("copyImage params", params);

  ec2.copyImage(params, function(err, data) {
    console.log("copyImage data", data);
    console.log("copyImage err", err);
    if (err) {
      console.log(err, err.stack); // an error occurred
      callback(null, failure({status: false}));
    } else  {
      callback(null, success(data));
    }
  });
}
