import { invokeApig } from "./awsLib";

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
