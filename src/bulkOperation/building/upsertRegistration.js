module.exports =
  registration =>
    [
      { update: { _type: 'building', _id: registration.buildingId } },
      { doc: { registration }, doc_as_upsert: true },
    ];
