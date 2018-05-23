const Bacon = require('baconjs');

const TYPES = require('./types')
  , PAGE_PATHS = require('./pagePaths')
  , Filter = require('./filter')
  , parseTagsByType = require('./parseTagsByType');

const get =
  type => {
    const [firstPagePath, ...remainingPagePaths] = PAGE_PATHS[type];
    return remainingPagePaths
      .reduce(
        (tagStream, remainingPagePath) =>
          tagStream.concat(createTagStream(type, remainingPagePath)),
        createTagStream(type, firstPagePath)
      );
  };

const createTagStream =
  (type, pagePath) => Bacon.fromBinder(
    sink => {
      parseTagsByType(type, pagePath)
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
