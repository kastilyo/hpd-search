const R = require('ramda')
  , FromXml = require('./../fromXml');

module.exports = R.pipe(
  FromXml.scrubNulls,
  data => ({
    id: data.BuildingID,
    borough: data.Boro.LongName,
    houseNumber: data.HouseNumber,
    streetName: data.StreetName,
    postalCode: data.Zip,
    block: data.Block,
    lot: data.Lot,
    bin: data.BIN,
    communityBoard: data.CommunityBoard,
    censusTract: data.CensusTract,
    management: data.ManagementProgram,
    class: R.defaultTo({ LongName: null }, data.DoBBuildingClass).LongName,
    storyCount: FromXml.resolveInteger('LegalStories')(data),
    classAUnitCount: FromXml.resolveInteger('LegalClassA')(data),
    classBUnitCount: FromXml.resolveInteger('LegalClassB')(data),
    status: data.RecordStatus.LongName,
  })
);
