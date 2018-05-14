const R = require('ramda');

module.exports =
  violation =>
    [
      { update: { _type: 'building', _id: violation.buildingId } },
      {
        script: {
          source: 'if(!ctx._source.violations.contains(params.violation)){ctx._source.violations.add(params.violation)}',
          lang: 'painless',
          params: {
            violation: R.omit(['buildingId'], violation),
          }
        },
        upsert: {
          violations: [R.omit(['buildingId'], violation)],
        },
      },
    ];
