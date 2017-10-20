import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);
  var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

  AWS
    .config
    .update({region: data.region });

  ec2.describeInstances({}, function (err, data) {
    if (err) {
      callback(null, failure({ status: false }));
    } else {
      callback(null, success(data.Reservations));
    }
  });
}