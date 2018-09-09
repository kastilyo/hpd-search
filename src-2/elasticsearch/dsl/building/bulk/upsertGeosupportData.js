const update = require('./update');

module.exports =
  geosupportData => update(geosupportData.buildingId)({
    doc: {
      location: {
        lat: geosupportData.address.latitude,
        lon: geosupportData.address.longitude,
      },
      locationInternal: {
        lat: geosupportData.address.latitudeInternalLabel,
        lon: geosupportData.address.longitudeInternalLabel,
      }
    },
    docAsUpsert: true,
  });
