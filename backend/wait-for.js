import AWS from "aws-sdk";
import { success, failure } from "./libs/response-lib";

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  console.log("wait-for data", data);

  AWS
    .config
    .update({ region: data.region });

  const ec2 = new AWS.EC2();

  /*
  ec2.waitFor(
    data.state,
    data.params,
    function (err, data) {
      if (err) {
        callback(null, failure({ status: false, err: err }));
      } else {
        callback(null, success(data));
      }
    });
    */

    ec2.describeInstances({
      InstanceIds: [ "i-05611bce03b4f0530" ],
    },function(err,data) {
      if(err){
        callback(null,failure({ status:false, err:err }));
      } else {
        callback(null,success(data));
      }
    });
  }