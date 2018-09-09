const R = require('ramda')
  , { DateTime } = require('luxon')
  , FromXml = require('./../fromXml')
  , Contact = require('./contact');

module.exports = R.pipe(
  FromXml.scrubNulls,
  data => ({
    id: data.RegistrationID,
    buildingId: data.BuildingID,
    lastRegistrationAt: DateTime.fromISO(data.LastRegistrationDate),
    expiresAt: DateTime.fromISO(data.RegistrationEndDate),
    contacts: FromXml.resolveArray(data.Contacts).map(Contact.fromXml)
  })
);
