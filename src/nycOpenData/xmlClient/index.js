const Bacon = require('baconjs');

const TYPES = require('./types')
  , parseTagsByType = require('./parseTagsByType');

const getStream =
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

const createFilter =
  ({borough = null, id = null} = {}) =>
    xmlTagData => {
      const doesIdMatch = id
        ? `${id}` === xmlTagData.children.BuildingID.value
        : true;

      const {
        SeqNo: {value: seqNo},
        ShortName: {value: shortName},
        LongName: {value: longName},
      } = xmlTagData.children.Boro.children;
      const doesBoroughMatch =
        borough
          ? `${borough}` === seqNo
            || `${borough}`.toUpperCase() === shortName
            || `${borough}`.toUpperCase() === longName
          : true;

      return doesIdMatch && doesBoroughMatch;
    };

module.exports = {
  TYPES,
  getStream,
  createFilter,
};
