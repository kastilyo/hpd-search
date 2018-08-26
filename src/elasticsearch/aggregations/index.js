const fieldAggregation = require('./fieldAggregation');

module.exports = {
  /**
   * A metric aggregation that computes the bounding box containing all geo_point values for a
   * field.
   */
  geoBounds: fieldAggregation('geo_bounds'),
  /**
   * A metric aggregation that computes the weighted centroid from all coordinate values for a
   * Geo-point datatype field.
   */
  geoCentroid: fieldAggregation('geo_centroid'),
  terms: fieldAggregation('terms'),
};
