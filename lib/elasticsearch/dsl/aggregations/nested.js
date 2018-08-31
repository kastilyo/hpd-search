const search = require('./../search');

module.exports = (path, ...aggs) => ({
  [path]: {
    nested: {
      path
    },
    ...search.aggs(...aggs)
  }
});
