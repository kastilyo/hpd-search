const NycOpenData = require('./../../../src/nycOpenData');

const create =
  () =>
    NycOpenData.create(process.env.SODA_APP_TOKEN);

module.exports = {
  ...NycOpenData,
  create,
};
