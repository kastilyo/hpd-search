const Client = require('./client');

/**
 * A web client to the a geoclient web instance. Just tell it what host to make requests to.
 */
const create =
  host => {
    const client = Client.create(host);
    return {
      getByAddress: require('./getByAddress')(client),
      getByBbl: require('./getByBbl')(client),
      getByBin: require('./getByBin')(client),
    };
  };

module.exports = {
  create,
};
