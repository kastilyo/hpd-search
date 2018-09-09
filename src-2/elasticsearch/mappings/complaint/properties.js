module.exports = {
  id: {
    type: 'keyword',
  },
  receivedAt: {
    type: 'date',
  },
  status: {
    type: 'keyword',
  },
  statusUpdatedAt: {
    type: 'date',
  },
  problems: {
    type: 'nested',
    properties: {
      id: {
        type: 'keyword',
      },
      unitType: {
        type: 'keyword',
      },
      spaceType: {
        type: 'keyword'
      },
      type: {
        type: 'keyword',
      },
      majorCategory: {
        type: 'keyword'
      },
      minorCategory: {
        type: 'keyword',
      },
      code: {
        type: 'keyword',
      },
      status: {
        type: 'keyword',
      },
      statusUpdatedAt: {
        type: 'date',
      },
      statusDescription: {
        type: 'text',
      }
    }
  }
};
