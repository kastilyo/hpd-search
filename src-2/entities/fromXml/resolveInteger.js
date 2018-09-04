const R = require('ramda');

module.exports = key => R.pipe(
  R.path([key]),
  R.ifElse(
    R.isNil,
    () => null,
    number => parseInt(number)
  ),
);
