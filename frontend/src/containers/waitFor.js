// EC2 waitFor loops

import { invokeApig } from "../libs/awsLib";
import sleep from "../libs/sleep";

export async function waitForStopped(instanceId, region) {
  // This is not using a loop because that implicitly puts
  // function creation in the loop, which really disturbs
  // Chrome.

  let result = await checkStopped(instanceId, region);
    console.log("waitForStopped result 1", result);
  if (result.status == "stopped") {
    return result; 
  }

  result = await checkStopped(instanceId, region);
    console.log("waitForStopped result 2", result);
  if (result.status == "stopped") {
    return result; 
  }

  result = await checkStopped(instanceId, region);
console.log("waitForStopped result 3", result);
  if (result.status == "stopped") {
   return result; 
  }
 
  result = await checkStopped(instanceId, region);
console.log("waitForStopped result 4", result);
  if (result.status == "stopped") {
   return result; 
  }

  result = await checkStopped(instanceId, region);
console.log("waitForStopped result 5", result);
  if (result.status == "stopped") {
   return result; 
  }

  return { status: "false", error: "never stopped instance" };
}

async function checkStopped(instanceId, region) {
  let maxTries = 0;
  let callResult = { status: "wot wot!" }; 

    await sleep(30000);

    callResult = await invokeApig({
        path: "/wait-for",
        method: "POST",
        headers: {},
        queryParams: {},
        body: {
          state: 'instanceStopped',
          region: region,
          params: {
            "InstanceIds": [ instanceId ],
          }
        }
    });

    console.log("checkStopped callResult", callResult);
    const status = callResult.Reservations[0].Instances[0].State.Name; 
    const code   = callResult.Reservations[0].Instances[0].State.Code; 

    console.log("checkStopped status : code", code);
    console.log("checkStopped status : status", status);

      if (code === 80) {
        console.log("checkStopped returning true");
        return { status: "true", code: code, status: status };
      }

      console.log("checkStopped returning is false");
      return { status: "false", code: code, status: status }
}