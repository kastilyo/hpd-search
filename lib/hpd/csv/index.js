const Client = require('./client');

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
