module.exports =
  building =>
    [
      { update: { _type: 'building', _id: building.id } },
      { doc: building, doc_as_upsert: true },
    ];
