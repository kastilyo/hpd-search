const TYPES = require('./types');

module.exports =
  (type, data) => {
    switch (type) {
    case TYPES.BUILDING:
      return data.id;
    default:
      return data.buildingId;
    }
  };
