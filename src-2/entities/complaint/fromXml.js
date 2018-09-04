const R = require('ramda')
  , { DateTime } = require('luxon')
  , FromXml = require('./../fromXml')
  , Problem = require('./problem');

module.exports = R.pipe(
  FromXml.scrubNulls,
  data => ({
    id: data.ComplaintID,
    buildingId: data.BuildingID,
    receivedAt: DateTime.fromISO(data.ReceivedDate),
    status: data.Status.LongName,
    statusUpdatedAt: DateTime.fromISO(data.StatusDate),
    problems: FromXml.resolveArray(data.Problems).map(Problem.fromXml)
  })
);
