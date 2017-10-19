export default {
// Blue Green related state.
bluegreen: {
  deployed : [],
  instances: [],
},

// Create image.
createImage: {
  instanceid: "",
  region: "",
  name: "",
  description: ""
},

// AMI Select.
amiSelect: {
  copyImage_srcRegion: [],
},

// Instances select.
instanceSelect: {
  createimage_instances: {
    instances: [], // data from AWS.
    filters: [],   // filters on data for AWS.
  },
  deployCandidates: {
    instances: [],
    filters: [],
  },
},

messages: { text: [] },

};