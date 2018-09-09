const Options = require('./options');

module.exports = (id, type, {
  doc = null,
  docAsUpsert = null,
  script = null,
  upsert = null,
}) => [
  {
    update: {
      _id: id,
      _type: type,
    },
  },
  {
    ...doc ? { doc } : {},
    ...script ? Options.script(script) : {},
    ...upsert ? { upsert } : {},
    ...docAsUpsert !== null ? { doc_as_upsert: docAsUpsert } : {}
  }
];
