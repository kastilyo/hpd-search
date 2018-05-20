const { Building } = require('./../../src/bulkOperation');

const TYPES = require('./types');

module.exports =
  type => {
    switch (type) {
    case TYPES.BUILDING:
      return Building.upsert;
    case TYPES.REGISTRATION:
      return Building.upsertRegistration;
    case TYPES.VIOLATION:
      return Building.upsertViolations;
    case TYPES.COMPLAINT:
      return Building.upsertComplaints;
    case TYPES.LITIGATION:
      return Building.upsertLitigations;
    }
  };
