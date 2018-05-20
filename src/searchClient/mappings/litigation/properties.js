module.exports = {
  id: {
    type: 'keyword',
  },
  type: {
    type: 'keyword'
  },
  openedAt: {
    type: 'date'
  },
  status: {
    type: 'keyword'
  },
  openJudgement: {
    type: 'boolean',
  },
  harassmentFinding: {
    type: 'keyword'
  },
  harassmentFindingAt: {
    type: 'date'
  },
  penalty: {
    type: 'float'
  },
  respondent: {
    type: 'text'
  }
};
