// EC2 waitFor loops

import { invokeApig } from "../libs/awsLib";
import sleep from "../libs/sleep";

export async function waitForStopped(instanceId, region) {
  for (let x = 0; x < 10; x++) {
    let result = await checkStopped(instanceId, region);
    if (result.status === "true") {
      return result;
    }
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
      instanceId: instanceId,
      filters: [
        {
          Name: "instance-id",
          Values: [instanceId]
        }
      ]
    }
  });

  // TODO: Handle when callResult.Reservations is an empty array.
  const status = callResult.Reservations[0].Instances[0].State.Name;
  const code = callResult.Reservations[0].Instances[0].State.Code;

  if (code === 80) {
    return { status: "true", code: code, state: status };
  }

  return { status: "false", code: code, state: status };
}

export async function waitForImageAvailable(amiId, region) {
  for (let x = 0; x < 20; x++) {
    let result = await checkAvailable(amiId, region);
    if (result.status === "true") {
      return result;
    }
  }
  return { status: "false", error: "image never available." };
}

async function checkAvailable(amiId, region) {
  let callResult = { status: "wot wot!" };

  await sleep(60000);

  callResult = await invokeApig({
    path: "/describe-image",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      filters: [
        {
          Name: "state",
          Values: ["available"]
        }
      ],
      region: region,
      amiId: amiId
    }
  });

  if (callResult.Images.length !== 0) {
    return { status: "true", state: callResult };
  }

  return { status: "false", state: null };
}

// Wait for instance available.
export async function instanceAvailable(instanceId, region) {
  for (let x = 0; x < 10; ++x) {
    let result = await checkInstanceAvailable(instanceId, region);

    if (result.status === "true") {
      return result;
    }
  }
  return { status: "false", error: "Error never " };
}

// Check if instance is available.
async function checkInstanceAvailable(instanceId, region) {
  let callResult = {};

  await sleep(30000);

  callResult = await invokeApig({
    path: "/describe-instance",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      region: region,
      instanceId: instanceId,
      filters: [
        {
          Name: "instance-id",
          Values: [instanceId]
        }
      ]
    }
  });

  // TODO: Handle when callResult.Reservations is an empty array.
  const status = callResult.Reservations[0].Instances[0].State.Name;
  const code = callResult.Reservations[0].Instances[0].State.Code;

  if (code === 16) {
    return { status: "true", code: code, state: status };
  }

  return { status: "false", code: code, state: status };
}
