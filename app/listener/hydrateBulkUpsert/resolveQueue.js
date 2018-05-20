const TYPES = require('./types');

module.exports =
  type => {
    switch (type) {
    case TYPES.BUILDING:
      return process.env.RABBIT_HOLE_HYDRATE_BULK_UPSERT_BUILDING_QUEUE;
    case TYPES.REGISTRATION:
      return process.env.RABBIT_HOLE_HYDRATE_BULK_UPSERT_BUILDING_REGISTRATION_QUEUE;
    case TYPES.VIOLATION:
      return process.env.RABBIT_HOLE_HYDRATE_BULK_UPSERT_BUILDING_VIOLATION_QUEUE;
    case TYPES.COMPLAINT:
      return process.env.RABBIT_HOLE_HYDRATE_BULK_UPSERT_BUILDING_COMPLAINT_QUEUE;
    case TYPES.LITIGATION:
      return process.env.RABBIT_HOLE_INDEX_BUILDING_LITIGATION_QUEUE;
    }
  };
