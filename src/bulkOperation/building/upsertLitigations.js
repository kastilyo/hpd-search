const R = require('ramda');

module.exports =
  (buildingId, litigations) =>
    [
      { update: { _type: 'building', _id: buildingId } },
      {
        script: {
          id: 'upsert-litigations-to-building',
          params: {
            litigations: R.map(R.omit(['buildingId']), litigations),
          }
        },
        upsert: {
          litigations: R.map(R.omit(['buildingId']), litigations),
        },
      },
    ];
