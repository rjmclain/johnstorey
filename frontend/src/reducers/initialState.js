export default {
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
    startInstance_amis: [],
    startInstance_amis_currentAMI: "",
    copyImage_srcRegion_currentAMI: ""
  },

  // Instances select.
  instanceSelect: {
    createimage_instances: {
      loading: true,
      instances: [],
      error: null,
      deployed: [],
      filters: [],
      toDeploy: ""
    },
    deployCandidates: {
      loading: true,
      instances: [],
      error: null,
      deployed: [],
      filters: [],
      toDeploy: ""
    }
  },

  messages: {
    createImage: [],
    copyImage: [],
    startInstance: [],
    blueGreen: []
  }
};
