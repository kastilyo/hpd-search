const R = require('ramda')
  , update = require('./update');

module.exports =
  (buildingId, violations) =>
    update(buildingId)(R.pipe(
      R.map(R.omit(['buildingId'])),
      violations => ({
        script: {
          id: 'upsert-violations-to-building',
          params: { violations },
        },
        upsert: { violations },
      })
    )(violations));
