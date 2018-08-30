const aggs = require('./aggs')
  , query = require('./query')
  ;

const search = body => ({
  ...body.hasOwnProperty('size') ? { size: body.size } : {},
  ...body.hasOwnProperty('aggs') ? aggs(body.aggs) : {},
  ...body.hasOwnProperty('query') ? query(body.query) : {},
});

module.exports = Object.assign(search, {
  aggs,
  query,
});
