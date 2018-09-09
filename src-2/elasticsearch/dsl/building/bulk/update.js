const { Dsl } = require('./../../../../../lib/elasticsearch');

module.exports =
  id => options => Dsl.Bulk.update(id, 'building', options);
