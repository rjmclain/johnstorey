import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  AWS.config.update({ region: data.destRegion });
  const ec2 = new AWS.EC2();

  var params = {
    Name: data.destName /* required */,
    SourceImageId: data.srcAMI /* required */,
    SourceRegion: data.srcRegion /* required */,
    Description: data.destDescription,
    DryRun: false,
    Encrypted: false
  };

  ec2.copyImage(params, function(err, data) {
    if (err) {
      callback(null, failure({ status: false, err: err }));
    } else {
      callback(null, success(data));
    }
  });
}
