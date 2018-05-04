const Bacon = require('baconjs');

const TYPES = require('./types')
  , Filter = require('./filter')
  , parseTagsByType = require('./parseTagsByType');

const get =
  type => Bacon.fromBinder(
    sink => {
      parseTagsByType(type)
        .then(
          stream => {
            stream.on('data', sink);
            stream.on('end', () => sink(new Bacon.End()));
            stream.on('error', error => sink(new Bacon.Error(error)));
          }
        );
      return () => { };
    }
  );

module.exports = {
  Filter,
  TYPES,
  get,
};
