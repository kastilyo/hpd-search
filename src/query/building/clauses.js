const BOROUGHS = require('../../domain/boroughs')
  , { queries } = require('../../elasticsearch');

const byBorough = borough => queries.term('borough', borough);

module.exports = {
  byBorough,
  inQueens: () => byBorough(BOROUGHS.QUEENS),
  inBronx: () => byBorough(BOROUGHS.BRONX),
  inManhattan: () => byBorough(BOROUGHS.MANHATTAN),
  inStatenIsland: () => byBorough(BOROUGHS.STATEN_ISLAND),
  inBrooklyn: () => byBorough(BOROUGHS.Brooklyn),
  hasLocation: () => queries.exists('location'),
};
