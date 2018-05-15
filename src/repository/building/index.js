const operations = require('./operations');

const create =
  searchClient =>
    ({
      upsert: (...buildings) =>
        upsert(searchClient, buildings),
      upsertComplaints: (...complaints) =>
        upsertComplaints(searchClient, complaints),
      upsertViolations: (...violations) =>
        upsertViolations(searchClient, violations),
    });

const buildBulkUpsertOperations =
  buildings =>
    buildings.reduce((bulkOperations, building) => [
      ...bulkOperations,
      ...operations.upsert(building),
    ], []);

const buildBulkUpsertComplaintOperations =
  complaint =>
    complaint.reduce((bulkOperations, complaint) => [
      ...bulkOperations,
      ...operations.upsertComplaint(complaint),
    ], []);

const buildBulkUpsertViolationOperations =
  violation =>
    violation.reduce((bulkOperations, violation) => [
      ...bulkOperations,
      ...operations.upsertViolation(violation),
    ], []);

const groupByBuildingId =
  items =>
    items.reduce((groupedItems, item) => ({
      ...groupedItems,
      [item.buildingId]: !groupedItems[item.buildingId] ? [item] : [...groupedItems[item.buildingId], item]
    }), {});

const buildBulkUpsertViolationsOperations =
  violations => {
    const violationsByBuildingId = groupByBuildingId(violations);

    return Object.keys(violationsByBuildingId)
      .reduce((bulkOperations, buildingId) => [
        ...bulkOperations,
        ...operations.upsertViolations(buildingId, violationsByBuildingId[buildingId]),
      ], []);
  };

const upsert =
  (searchClient, buildings) =>
    searchClient.bulk(buildBulkUpsertOperations(buildings));

const upsertComplaints =
  (searchClient, complaints) =>
    searchClient.bulk(buildBulkUpsertComplaintOperations(complaints));

const upsertViolations =
  (searchClient, violations) =>
    searchClient.bulk(buildBulkUpsertViolationsOperations(violations));

module.exports = {
  create,
};
