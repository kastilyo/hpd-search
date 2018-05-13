const R = require('ramda');

module.exports =
  complaint =>
    [
      { update: { _type: 'building', _id: complaint.buildingId } },
      {
        script: {
          source: 'if(!ctx._source.complaints.contains(params.complaint)){ctx._source.complaints.add(params.complaint)}',
          lang: 'painless',
          params: {
            complaint: R.omit(['buildingId'], complaint),
          }
        },
        upsert: {
          complaints: [R.omit(['buildingId'], complaint)],
        },
      },
    ];
