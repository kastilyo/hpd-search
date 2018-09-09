const Entities = require('./../entities')
  , csvEntity$ = require('./csvEntity$');

module.exports =
  hpd =>
    csvEntity$(
      hpd.getLitigationsCsv,
      Entities.Litigation.fromCsv
    );

