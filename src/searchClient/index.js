const elasticsearch = require('elasticsearch');
const { DateTime } = require('luxon');
const mappings = require('./mappings');

const BASE_NAME = 'hpd';

const getExistingIndex =
  client =>
    client.indices.getAlias({ name: BASE_NAME })
      .then(response => Object.keys(response)[0])
      .catch(e => (e.statusCode && e.statusCode === 404) ? null : Promise.reject(e));

const setAlias =
  (client, newIndex, oldIndex) =>
    client.indices.updateAliases({
      body: {
        actions:
          oldIndex
            ? [
              { remove: { index: oldIndex, alias: BASE_NAME } },
              { add: { index: newIndex, alias: BASE_NAME } },
            ]
            : [
              { add: { index: newIndex, alias: BASE_NAME } },
            ]
      }
    });

const createIndex =
  (client, dateTime) =>
    client.indices.create({
      index: `${BASE_NAME}-${dateTime.toISODate()}`,
      body: {
        mappings,
      },
    });

const createIndexAndSetAlias =
  (client, dateTime) =>
    Promise.all([
      createIndex(client, dateTime).then(response => response.index),
      getExistingIndex(client)
    ]).then(([newIndex, oldIndex]) => setAlias(client, newIndex, oldIndex));

const create =
  options => {
    const client = new elasticsearch.Client(options);
    return {
      createIndexAndSetAlias: (dateTime = DateTime.utc()) =>
        createIndexAndSetAlias(client, dateTime),
      createIndex: (dateTime = DateTime.utc()) =>
        createIndex(client, dateTime),
      bulk: body =>
        client.bulk({
          index: BASE_NAME,
          _source: true,
          body
        })
    };
  };

module.exports = {
  create,
};
