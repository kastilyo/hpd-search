const Client = require('./client');

/**
 * A Client to file streams of CSV files from NYC Open Data.
 */
const create = appToken => {
  const client = Client.create(appToken);
  return {
    getLitigations: () => require('./getLitigations')(client),
    getViolations: () => require('./getViolations')(client),
  };
};

module.exports = {
  create
};
