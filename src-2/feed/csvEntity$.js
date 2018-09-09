const { map } = require('rxjs/operators')
  , Observable = require('./../../lib/observable');

const parseOptions = {
  columns: true,
  empty: null,
};

module.exports =
  (csvFileStreamFactory, entityFromCsvHydrator) =>
    Observable.fromCsv(csvFileStreamFactory, parseOptions)
      .pipe(map(entityFromCsvHydrator));
