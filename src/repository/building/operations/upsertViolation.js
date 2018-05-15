const R = require('ramda');

module.exports =
  violation =>
    [
      { update: { _type: 'building', _id: violation.buildingId } },
      {
        script: {
          id: 'upsert-violation-to-building',
          params: {
            violation: R.omit(['buildingId'], violation),
          }
        },
        upsert: {
          violations: [R.omit(['buildingId'], violation)],
        },
      },
    ];
