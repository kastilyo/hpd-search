const Geoclient = require('./../../../src/geoclient');

module.exports = {
  create: () => Geoclient.create(process.env.GEOCLIENT_HOST),
};
