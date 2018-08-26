const aggs = require('./aggs')
  , query = require('./query')
  ;

const search = body => ({
  ...body.hasOwnProperty('size') ? { size: body.size } : {},
  ...aggs(body.hasOwnProperty('aggs') ? body.aggs : {}),
  ...query(body.hasOwnProperty('query') ? body.query : {}),
});

module.exports = Object.assign(search, {
  aggs,
  query,
});
