const R = require('ramda')
  , resolveNull = require('./resolveNull');

module.exports = R.map(resolveNull);
