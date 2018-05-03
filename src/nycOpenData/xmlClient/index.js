const Bacon = require('baconjs');

const TYPES = require('./types')
  , parseTagsByType = require('./parseTagsByType');

const getStream =
  type => Bacon.fromBinder(
    sink =>
      parseTagsByType(type)
        .then(
          stream => {
            stream.on('data', sink);
            stream.on('end', () => sink(new Bacon.End()));
            stream.on('error', error => sink(new Bacon.Error(error)));
          }
        )
  );

module.exports = {
  TYPES,
  getStream,
};
