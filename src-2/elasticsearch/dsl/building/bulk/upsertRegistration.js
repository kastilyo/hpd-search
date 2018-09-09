const R = require('ramda')
  , update = require('./update');

module.exports =
  registration => update(registration.buildingId)(R.pipe(
    R.omit('buildingId'),
    registration => ({
      doc: { registration },
      docAsUpsert: true,
    })
  )(registration));
