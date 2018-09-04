const R = require('ramda');

module.exports = R.pipe(
  R.defaultTo([]),
  R.ifElse(
    R.is(Array),
    R.identity,
    contact => [contact],
  )
);
