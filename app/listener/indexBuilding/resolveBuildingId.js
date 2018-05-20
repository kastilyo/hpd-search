const TYPES = require('./types');

module.exports =
  (type, data) => {
    switch (type) {
    case TYPES.BUILDING:
      return data.id;
    case TYPES.REGISTRATION:
      return data.buildingId;
    }
  };
