const R = require('ramda');

module.exports =
  registration =>
    [
      { update: { _type: 'building', _id: registration.buildingId } },
      { doc: { registration: R.omit(['buildingId'], registration) }, doc_as_upsert: true },
    ];
