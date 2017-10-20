import { success, failure } from './libs/response-lib';
import AWS from 'aws-sdk';

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  AWS
    .config
    .update({ region: data.region });

  const ec2 = new AWS.EC2();

  ec2.describeImages({
    Owners: [ "self" ],
    Filters: data.filters,
  }, function (err, data) {
    if (err) {
      callback(null, failure({ status: false }));
    } else {
      callback(null, success(data));
    }
  });
}