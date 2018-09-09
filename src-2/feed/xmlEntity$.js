const { map } = require('rxjs/operators')
  , Observable = require('./../../lib/observable');

const parseOptions = {
  strict: true,
};

module.exports =
  (tag, fileStreamFactory, entityFromXmlHydrator) =>
    Observable.fromXml(tag, fileStreamFactory, parseOptions)
      .pipe(map(entityFromXmlHydrator));
