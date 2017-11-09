import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

export function main(event, context, callback) {
  console.log("enter event: ", event);
  const data = JSON.parse(event.body);

  console.log * ("data: ", data);

  AWS.config.update({ region: data.region });
  const ec2 = new AWS.EC2();

  // Set params for snapshot.
  const params = {
    Resources: data.resources,
    Tags: data.tags
  };

  ec2.createTags(params, function(err, data) {
    if (err) {
      callback(null, failure({ status: false, error: err }));
    } else {
      callback(null, success(data));
    }
  });
}
