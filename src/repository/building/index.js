const operations = require('./operations');

const create =
  searchClient =>
    ({
      upsert: (...buildings) =>
        upsert(searchClient, buildings),
    });

const buildBulkUpsertOperations =
  buildings =>
    buildings.reduce((bulkOperations, building) => [
      ...bulkOperations,
      ...operations.upsert(building),
    ], []);

const upsert =
  (searchClient, buildings) =>
    searchClient.bulk(buildBulkUpsertOperations(buildings));

module.exports = {
  create,
};
