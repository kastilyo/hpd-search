const Entities = require('./../entities')
  , xmlEntity$ = require('./xmlEntity$');

module.exports =
  hpd =>
    xmlEntity$(
      'Building',
      hpd.getBuildingsXml,
      Entities.Building.fromXml
    );

