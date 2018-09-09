const csv = require('csv-streamify')
  , Rx = require('rxjs');

module.exports = (fileStreamFactory, options = {}) => Rx.Observable.create(observer => {
  fileStreamFactory()
    .pipe(csv(options))
    .on('data', data => observer.next(data))
    .on('end', () => observer.complete())
    .on('error', error => observer.error(error));
});
