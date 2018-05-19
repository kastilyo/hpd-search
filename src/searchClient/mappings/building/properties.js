module.exports = {
  id: {
    type: 'keyword',
  },
  borough: {
    type: 'keyword',
  },
  houseNumber: {
    type: 'keyword',
  },
  streetName: {
    type: 'keyword',
  },
  postalCode: {
    type: 'keyword',
  },
  block: {
    type: 'keyword',
  },
  lot: {
    type: 'keyword',
  },
  bin: {
    type: 'keyword',
  },
  communityBoard: {
    type: 'keyword',
  },
  censusTract: {
    type: 'keyword',
  },
  management: {
    type: 'keyword',
  },
  class: {
    type: 'keyword',
  },
  storyCount: {
    type: 'integer',
  },
  classAUnitCount: {
    type: 'integer',
  },
  classBUnitCount: {
    type: 'integer',
  },
  status: {
    type: 'keyword',
  },
  complaints: {
    type: 'nested',
    properties: require('./../complaint/properties'),
  },
  violations: {
    type: 'nested',
    properties: require('./../violation/properties'),
  },
  registration: {
    type: 'object',
    properties: require('./../registration/properties'),
  }
};
