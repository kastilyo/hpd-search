module.exports = {
  id: {
    type: 'keyword',
  },
  lastRegisteredAt: {
    type: 'date',
  },
  expiresAt: {
    type: 'date',
  },
  contacts: {
    type: 'nested',
    properties: {
      id: {
        type: 'keyword'
      },
      type: {
        type: 'keyword'
      },
      description: {
        type: 'text',
      },
      corporationName: {
        type: 'text',
      },
      title: {
        type: 'text',
      },
      firstName: {
        type: 'text',
      },
      middleInitial: {
        type: 'text',
      },
      lastName: {
        type: 'text',
      },
      business: {
        type: 'object',
        properties: {
          houseNumber: {
            type: 'keyword'
          },
          streetName: {
            type: 'keyword'
          },
          apartment: {
            type: 'keyword'
          },
          city: {
            type: 'keyword'
          },
          state: {
            type: 'keyword'
          },
          postalCode: {
            type: 'keyword'
          }
        }
      }
    }
  }
};
