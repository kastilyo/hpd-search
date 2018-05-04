const Bacon = require('baconjs');

const Client = require('./client')
  , TYPES = require('./types');

const create =
  appToken => {
    const client = Client.create(appToken);
    return {
      get: (type, filterOptions = {}) =>
        Bacon.fromBinder(
          sink => {
            client.getRows(type, filterOptions)
              .then(
                stream => {
                  stream.on('data', sink);
                  stream.on('end', () => sink(new Bacon.End()));
                  stream.on('error', error => sink(new Bacon.Error(error)));
                }
              );
            return () => {};
          }
        ),
    };
  };

module.exports = {
  create,
  TYPES,
};
