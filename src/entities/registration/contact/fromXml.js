const R = require('ramda')
  , FromXml = require('./../../fromXml');

module.exports = R.pipe(
  FromXml.scrubNulls,
  data => ({
    id: data.RegistrationContactID,
    type: data.Type,
    description: data.ContactDescription,
    corporationName: R.defaultTo(data.CorporationName, null),
    title: R.defaultTo(data.Title, null),
    firstName: R.defaultTo(data.FirstName, null),
    lastName: R.defaultTo(data.LastName, null),
    business: {
      houseNumber: data.BusinessHouseNumber,
      streetName: data.BusinessStreetName,
      apartment: data.BusinessApartment,
      city: data.BusinessCity,
      state: data.BusinessState,
      postalCode: data.BusinessZip,
    },
  })
);
