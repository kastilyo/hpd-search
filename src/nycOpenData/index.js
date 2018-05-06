const XmlStream = require('./xmlStream')
  , SodaStream = require('./sodaStream');

const SOURCES = require('./sources');
const TYPES = {
  XML: XmlStream.TYPES,
  SODA: SodaStream.TYPES,
};

const isSupportedSource =
  source =>
    Object.values(SOURCES).indexOf(source) > -1;

const isSupportedType =
  (source, type) =>
    getSupportedTypes(source).indexOf(type) > -1;

const getSupportedTypes =
  source => {
    switch (source) {
    case SOURCES.XML:
      return Object.values(XmlStream.TYPES);
    case SOURCES.SODA:
      return Object.values(SodaStream.TYPES);
    }
  };

const create =
  appToken => {
    const sodaStream = SodaStream.create(appToken);
    return {
      isSupportedSource,
      isSupportedType,
      getStream: (source, type, filterOptions = {}) => {
        switch (source) {
        case SOURCES.XML:
          return XmlStream.get(type)
            .filter(XmlStream.Filter.create(type, filterOptions))
            .map(data => ({ type, source, data }));
        case SOURCES.SODA:
          return sodaStream.get(type, filterOptions)
            .map(data => ({ type, source, data }));
        }
      }
    };
  };

module.exports = {
  TYPES,
  SOURCES,
  create,
};
