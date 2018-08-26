const { aggregations } = require('../../elasticsearch');

module.exports = {
  viewport: () => aggregations.geoBounds('viewport', 'location'),
  centroid: () => aggregations.geoCentroid('centroid', 'location'),
  boroughs: () => aggregations.terms('borough'),
};
