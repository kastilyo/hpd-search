const R = require('ramda');

module.exports =
  (buildingId, complaints) =>
    [
      { update: { _type: 'building', _id: buildingId } },
      {
        script: {
          id: 'upsert-complaints-to-building',
          params: {
            complaints: R.map(R.omit(['buildingId']), complaints),
          }
        },
        upsert: {
          complaints: R.map(R.omit(['buildingId']), complaints),
        },
      },
    ];
