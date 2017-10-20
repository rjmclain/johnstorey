// EC2 waitFor loops

import { invokeApig } from "../libs/awsLib";
import sleep from "../libs/sleep";

export async function waitForStopped(instanceId, region) {
  // This is not using a loop because that implicitly puts
  // function creation in the loop, which really disturbs
  // Chrome.

  let result = await checkStopped(instanceId, region);
  console.log("1 waitForStopped result", result);
  if (result.status === "true") {
    return result; 
  }

  result = await checkStopped(instanceId, region);
  console.log("2 waitForStopped result", result);
  if (result.status === "true") {
    return result; 
  }

  result = await checkStopped(instanceId, region);
  console.log("3 waitForStopped result", result);
  if (result.status === "true") {
   return result; 
  }
 
  result = await checkStopped(instanceId, region);
  console.log("3 waitForStopped result", result);
  if (result.status === "true") {
   return result; 
  }

  result = await checkStopped(instanceId, region);
  console.log("5 waitForStopped result", result);
  if (result.status === "true") {
   return result; 
  }

  return { status: "false", error: "never stopped instance" };
}

async function checkStopped(instanceId, region) {

  let callResult = { status: "wot wot!" }; 

    await sleep(30000);

    callResult = await invokeApig({
        path: "/describe-instance",
        method: "POST",
        headers: {},
        queryParams: {},
        body: {
          region: region,
          instanceId: instanceId ,
          filters: [
            {
              Name: "instance-id",
              Values: [ instanceId ],
            }
         ]
        }
    });

    console.log("checkStopped callResult", callResult);

    // TODO: Handle when callResult.Reservations is an empty array.
    const status = callResult.Reservations[0].Instances[0].State.Name; 
    const code   = callResult.Reservations[0].Instances[0].State.Code; 

    console.log("waitFor status", status);

      if (code === 80) {
        console.log("waitFor returning true");
        return { status: "true", code: code, state: status };
      }

      return { status: "false", code: code, state: status }
}


export async function waitForImageAvailable(amiId, region) {
  // This is not using a loop because that implicitly puts
  // function creation in the loop, which really disturbs
  // Chrome.

  let result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 1", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 2", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 3", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 4", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 5", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 6", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 7", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 8", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 9", result);
  if (result.status === "available") {
    return result; 
  }

  result = await checkAvailable(amiId, region);
  console.log("waitForIMageAvailable result 10", result);
  if (result.status === "available") {
    return result; 
  }

  return { status: "false", error: "image never available." };

}

async function checkAvailable(amiId, region) {
  console.log("checkAvailable amiId", amiId);
  console.log("checkAvailable region", region);

  let callResult = { status: "wot wot!" }; 

  await sleep(60000);

    callResult = await invokeApig({
        path: "/describe-images",
        method: "POST",
        headers: {},
        queryParams: {},
        body: {
          state: 'available',
          region: region,
          params: {
            "ImageIds": [ amiId ],
          }
        }
    });

    console.log("waitFor image available", callResult);

    const state = callResult.Reservations[0].Instances[0].State.Name; 
    const code   = callResult.Reservations[0].Instances[0].State.Code; 

      if (code === 80) {
        return { status: "true", code: code, state: state };
      }

    return { status: "false", code: code, state: state }
}