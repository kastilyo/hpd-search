const Search = require('./../search');

module.exports = (path, ...aggs) => ({
  [path]: {
    nested: {
      path
    },
    ...Search.aggs(...aggs)
  }
});
