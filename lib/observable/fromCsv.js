const csv = require('csv-streamify')
  , Rx = require('rxjs');

module.exports = (fileStream, options = {}) => Rx.Observable.create(observer => {
  fileStream
    .pipe(csv(options))
    .on('data', data => observer.next(data))
    .on('end', () => observer.complete())
    .on('error', error => observer.error(error));
});
