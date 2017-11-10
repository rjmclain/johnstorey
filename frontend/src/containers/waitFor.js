// EC2 waitFor loops

import * as awsHelpers from "../libs/awsHelpers";
import sleep from "../libs/sleep";

export async function waitForStopped(instanceId, region) {
  for (let x = 0; x < 20; x++) {
    let result = await checkStopped(instanceId, region);
    if (result.status === "true") {
      return result;
    }
  }
  return { status: "false", error: "never stopped instance" };
}

async function checkStopped(instanceId, region) {
  await sleep(30000);

  const callResult = await awsHelpers.describeInstance(region, instanceId, [
    {
      Name: "instance-id",
      Values: [instanceId]
    }
  ]);

  // TODO: Handle when callResult.Reservations is an empty array.
  const status = callResult.Reservations[0].Instances[0].State.Name;
  const code = callResult.Reservations[0].Instances[0].State.Code;

  if (code === 80) {
    return {
      status: "true",
      code: code,
      instance: callResult.Reservations[0].Instances[0],
      state: status
    };
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
  await sleep(60000);

  const callResult = await awsHelpers.describeImage(region, amiId, [
    { Name: "state", Values: ["available"] }
  ]);

  if (callResult.Images.length !== 0) {
    return { status: "true", state: callResult };
  }

  return { status: "false", state: null };
}

// Wait for instance available.
export async function instanceAvailable(instanceId, region) {
  for (let x = 0; x < 20; ++x) {
    let result = await checkInstanceAvailable(instanceId, region);

    if (result.status === "true") {
      return result;
    }
  }
  return { status: "false", error: "Error never " };
}

// Check if instance is available.
async function checkInstanceAvailable(instanceId, region) {
  await sleep(30000);

  const instance = await awsHelpers.describeInstance(region, instanceId, [
    { Name: "instance-id", Values: [instanceId] }
  ]);

  // TODO: Handle when callResult.Reservations is an empty array.
  const status = instance.Reservations[0].Instances[0].State.Name;
  const code = instance.Reservations[0].Instances[0].State.Code;

  if (code === 16) {
    return { status: "true", code: code, state: status };
  }

  return { status: "false", code: code, state: status };
}
