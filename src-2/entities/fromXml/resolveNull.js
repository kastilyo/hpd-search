const R = require('ramda');

const NULL_KEY = 'i:nil';

module.exports = R.ifElse(
  R.pipe(
    R.path([NULL_KEY]),
    R.equals('true')
  ),
  () => null,
  R.identity,
);
