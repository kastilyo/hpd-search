const R = require('ramda')
  , update = require('./update');

module.exports =
  (buildingId, litigations) =>
    update(buildingId)(R.pipe(
      R.map(R.omit(['buildingId'])),
      litigations => ({
        script: {
          id: 'upsert-litigations-to-building',
          params: { litigations },
        },
        upsert: { litigations },
      })
    )(litigations));

