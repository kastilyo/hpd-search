const R = require('ramda');

module.exports =
  complaint =>
    [
      { update: { _type: 'building', _id: complaint.buildingId } },
      {
        script: {
          id: 'upsert-complaint-to-building',
          params: {
            complaint: R.omit(['buildingId'], complaint),
          }
        },
        upsert: {
          complaints: [R.omit(['buildingId'], complaint)],
        },
      },
    ];
