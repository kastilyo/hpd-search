const BOROUGHS = require('../../../domain/boroughs')
  , { queries } = require('../../../elasticsearch');

const byBorough = borough => queries.term('borough', borough);
const hasField = field => queries.exists(field);
const hasNested = field => queries.nested(field, hasField(field));

module.exports = {
  byBorough,
  inQueens: () => byBorough(BOROUGHS.QUEENS),
  inBronx: () => byBorough(BOROUGHS.BRONX),
  inManhattan: () => byBorough(BOROUGHS.MANHATTAN),
  inStatenIsland: () => byBorough(BOROUGHS.STATEN_ISLAND),
  inBrooklyn: () => byBorough(BOROUGHS.BROOKLYN),
  hasLocation: () => hasField('location'),
  hasRegistration: () => hasField('registration'),
  hasViolations: () => hasNested('violations'),
  hasComplaints: () => hasNested('complaints'),
  hasLitigations: () => hasNested('litigations'),
};
