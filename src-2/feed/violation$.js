const Entities = require('./../entities')
  , csvEntity$ = require('./csvEntity$');

module.exports =
  hpd =>
    csvEntity$(
      hpd.getViolationsCsv,
      Entities.Violation.fromCsv
    );

