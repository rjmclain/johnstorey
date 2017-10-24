import AWS from "aws-sdk";
import {success, failure} from "./libs/response-lib";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  AWS
    .config
    .update({region: data.region});
  const ec2 = new AWS.EC2();

  const params = {
    ImageId: data.imageId,
    MaxCount: 1,
    MinCount: 1,
    InstanceType: data.instanceSize,
    SubnetId: data.subnetId,
    TagSpecifications: [
      {
        ResourceType: 'instance',
        Tags: [
          {
            Key: 'Name',
            Value: data.instanceName,
          },
          {
            Key: 'Description',
            Value: data.description,
          },
          {
            Key: 'Version',
            Value: data.version,
          }
        ]
      }
    ]
  };

  console.log('run-instances params', params);

  // Stop the instance.
  ec2.runInstances(
    params,
    function (err, data) {
      if (err !== null) {
        callback(null, failure({ status: false, error: err }));
      } else {
        callback(null, success(data));
      }
    });
}
