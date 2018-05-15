const R = require('ramda');

module.exports =
  (buildingId, violations) =>
    [
      { update: { _type: 'building', _id: buildingId } },
      {
        script: {
          id: 'upsert-violation-to-building',
          params: {
            violations: R.map(R.omit(['buildingId']), violations),
          }
        },
        upsert: {
          violations: R.map(R.omit(['buildingId']), violations),
        },
      },
    ];
