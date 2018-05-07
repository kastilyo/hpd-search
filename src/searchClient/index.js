const elasticsearch = require('elasticsearch');
const { DateTime } = require('luxon');
const mappings = require('./mappings');

const BASE_NAME = 'hpd';

const createIndex =
  (client, dateTime) =>
    client.indices.create({
      index: `${BASE_NAME}-${dateTime.toISODate()}`,
      body: {
        mappings,
      },
    }).then(() => client.indices.putAlias({
      name: BASE_NAME,
      index: `${BASE_NAME}-${dateTime.toISODate()}`,
    }));

const create =
  options => {
    const client = new elasticsearch.Client(options);
    return {
      createIndex: (dateTime = DateTime.utc()) =>
        createIndex(client, dateTime),
    };
  };

module.exports = {
  create,
};
