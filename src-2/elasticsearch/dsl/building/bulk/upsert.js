const update = require('./update');

module.exports =
  building => update(building.id)({
    doc: building,
    docAsUpsert: true,
  });
