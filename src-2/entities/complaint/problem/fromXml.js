const FromXml = require('./../../fromXml')
  , { DateTime } = require('luxon')
  , R = require('ramda');

module.exports = R.pipe(
  FromXml.scrubNulls,
  data => ({
    id: data.ProblemID,
    unitType: data.UnitType.LongName,
    spaceType: data.SpaceType.LongName,
    type: data.Type.LongName,
    majorCategory: data.MajorCategory.LongName,
    minorCategory: data.MinorCategory.LongName,
    code: data.Code.LongName,
    status: data.Status.LongName,
    statusUpdatedAt: DateTime.fromISO(data.StatusDate),
    statusDescription: R.ifElse(
      R.is(String),
      statusDescription => statusDescription.trim(),
      () => null,
    )(data.StatusDescription),
  })
);
