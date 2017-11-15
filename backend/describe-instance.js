import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);
  console.log("describe-instance data", data);

  AWS.config.update({ region: data.region });

  const ec2 = new AWS.EC2();

  // Get the instance status and return it.
  ec2.describeInstances(
    {
      InstanceIds: [data.instanceId],
      Filters: data.filters
    },
    function(err, data) {
      if (err) {
        callback(null, failure({ status: false, err: err }));
      } else {
        callback(null, success(data));
      }
    }
  );
}
