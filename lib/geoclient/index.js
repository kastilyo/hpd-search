const Client = require('./client');

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
