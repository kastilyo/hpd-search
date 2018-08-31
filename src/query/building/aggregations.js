const { aggregations } = require('../../../lib/elasticsearch').dsl;

module.exports = {
  viewport: () => aggregations.geoBounds('viewport', 'location'),
  centroid: () => aggregations.geoCentroid('centroid', 'location'),
  boroughs: () => aggregations.terms('boroughs', 'borough'),
};
