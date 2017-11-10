import { invokeApig } from "./awsLib";

// Find the specified tag value in the array of tags.
export function findTag(tagName, tags) {
  let result = [];
  if (tags) {
    result = tags.filter(tag => {
      if (tag.Key === tagName) {
        return tag.Value;
      }
      return "";
    });
  }

  return result.length === 0 ? "" : result[0].Value;
}

// Add tags to any resource.
export async function createTags(region, resource, tags) {
  await invokeApig({
    path: "/create-tags",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      region: region,
      resources: [resource],
      tags: tags
    }
  });
}

// Create an image.
export async function createImage(region, instanceId, name) {
  const createImageResult = await invokeApig({
    path: "/create-image",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      instanceId: instanceId,
      amiName: name,
      region: region
    }
  });

  return createImageResult;
}

// Describe an image.
export async function describeImage(region, amiId, filters) {
  let body = {
    region: region,
    amiId: amiId
  };

  if (filters !== undefined && filters !== null && filters.length !== 0) {
    body["filters"] = filters;
  }

  const image = await invokeApig({
    path: "/describe-image",
    method: "POST",
    headers: {},
    queryParams: {},
    body: body
  });

  return image;
}

// Copy image.
export async function copyImage(
  destinationName,
  destinationRegion,
  sourceRegion,
  sourceAMI,
  destinationDescription
) {
  const copyResults = await invokeApig({
    path: "/copy-image-regions",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      destName: destinationName,
      destRegion: destinationRegion,
      srcRegion: sourceRegion,
      srcAMI: sourceAMI
    }
  });

  return copyResults;
}

// Start an EC2 instance.
export async function startInstance(
  region,
  imageId,
  instanceSize,
  subnetId,
  instanceName,
  description,
  version
) {
  const runningInstance = invokeApig({
    path: "/run-instance",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      region: region,
      imageId: imageId,
      instanceSize: instanceSize,
      subnetId: subnetId,
      instanceName: instanceName,
      description: description,
      version: version
    }
  });

  return runningInstance;
}

// Describe an instance.
export function describeInstance(region, instanceId, filters) {
  const instance = invokeApig({
    path: "/describe-instance",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      region: region,
      instanceId: instanceId,
      filters: filters
    }
  });

  return instance;
}

// Stop a running EC2 instance.
export function stopInstance(region, instanceId) {
  invokeApig({
    path: "/stop-instance",
    method: "POST",
    headers: {},
    queryParams: {},
    body: {
      region: region,
      instanceId: instanceId
    }
  });
}
