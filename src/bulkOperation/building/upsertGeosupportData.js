
module.exports =
  geosupportData =>
    [
      { update: { _type: 'building', _id: geosupportData.buildingId } },
      {
        doc: {
          location: {
            lat: geosupportData.address.latitude,
            lon: geosupportData.address.longitude,
          },
          internalLocation: {
            lat: geosupportData.address.latitudeInternalLabel,
            lon: geosupportData.address.longitudeInternalLabel,
          }
        },
        doc_as_upsert: true,
      },
    ];
