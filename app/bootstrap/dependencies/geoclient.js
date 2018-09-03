const Geoclient = require('./../../../lib/geoclient');

module.exports = {
  create: () => Geoclient.create(process.env.GEOCLIENT_HOST),
};
