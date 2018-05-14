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
  complaint =>
    complaint.reduce((bulkOperations, complaint) => [
      ...bulkOperations,
      ...operations.upsertViolation(complaint),
    ], []);

const upsert =
  (searchClient, buildings) =>
    searchClient.bulk(buildBulkUpsertOperations(buildings));

const upsertComplaints =
  (searchClient, complaints) =>
    searchClient.bulk(buildBulkUpsertComplaintOperations(complaints));

const upsertViolations =
  (searchClient, violations) =>
    searchClient.bulk(buildBulkUpsertViolationOperations(violations));

module.exports = {
  create,
};
