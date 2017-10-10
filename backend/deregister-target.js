import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

AWS
  .config
  .update({region: "us-east-1"});

export function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const elbv2 = new AWS.ELBv2();
  const params = {
    TargetGroupArn: data.group,
    Targets: [
    {
      Id: data.id,
    }
    ]
  };

  elbv2.deregisterTargets(params, function (err, data) {
    if (err) {
      //callback(null, failure({ status: false }));
      callback(null, failure(err));
    } else {
      callback(null, success(data));
    }
  });
}