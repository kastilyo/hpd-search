const Client = require('./client');

const address =
  client => ({houseNumber, street, borough = null, zip = null}) =>
    client.get('address', { houseNumber, street, borough , zip });

const bbl =
  client => ({ borough, block, lot }) =>
    client.get('bbl', { borough, block, lot });

const bin =
  client => ({ bin }) =>
    client.get('bin', { bin });

const create =
  host => {
    const client = Client.create(host);
    return {
      address: address(client),
      bbl: bbl(client),
      bin: bin(client),
    };
  };

module.exports = {
  create,
};
