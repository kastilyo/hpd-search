module.exports = {
  id: {
    type: 'keyword',
  },
  status: {
    type: 'keyword',
  },
  statusUpdatedAt: {
    type: 'date',
  },
  apartment: {
    type: 'keyword',
  },
  story: {
    type: 'keyword',
  },
  class: {
    type: 'keyword',
  },
  inspectedAt: {
    type: 'date',
  },
  approvedAt: {
    type: 'date',
  },
  originalCertifyByAt: {
    type: 'date',
  },
  originalCorrectByAt: {
    type: 'date',
  },
  certifyByAt: {
    type: 'date',
  },
  correctByAt: {
    type: 'date',
  },
  certifiedAt: {
    type: 'date',
  },
  orderNumber: {
    type: 'keyword',
  },
  noticeOfViolation: {
    type: 'object',
    properties: {
      id: {
        type: 'keyword',
      },
      type: {
        type: 'keyword',
      },
      issuedAt: {
        type: 'date'
      },
      description: {
        type: 'text',
      }
    }
  }
};
