const flow = require('xml-flow')
  , Rx = require('rxjs');

module.exports = (tag, fileStreamFactory, options = {}) => Rx.Observable.create(observer => {
  flow(fileStreamFactory(), options)
    .on(`tag:${tag}`, node => observer.next(node))
    .on('end', () => observer.complete())
    .on('error', error => observer.error(error));
});
