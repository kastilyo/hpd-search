const R = require('ramda')
  , update = require('./update');

module.exports =
  (buildingId, complaints) =>
    update(buildingId)(R.pipe(
      R.map(R.omit(['buildingId'])),
      complaints => ({
        script: {
          id: 'upsert-complaints-to-building',
          params: { complaints },
        },
        upsert: { complaints },
      })
    )(complaints));
