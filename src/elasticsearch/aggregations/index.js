const geoAggregation = require('./geoAggregation');

module.exports = {
  /**
   * A metric aggregation that computes the bounding box containing all geo_point values for a
   * field.
   */
  geoBounds: geoAggregation('geo_bounds'),
  /**
   * A metric aggregation that computes the weighted centroid from all coordinate values for a
   * Geo-point datatype field.
   */
  geoCentroid: geoAggregation('geo_centroid'),
  terms: require('./terms'),
};
