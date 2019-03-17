/**
 * Utility functions for creating elasticsearch DSL objects to be used in requests
 */
module.exports = {
  Aggregations: require('./aggregations'),
  Queries: require('./queries'),
  Search: require('./search'),
  Bulk: require('./bulk'),
};
