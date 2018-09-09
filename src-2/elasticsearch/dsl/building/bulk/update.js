const { bulk } = require('./../../../lib/elasticsearch').dsl;

module.exports =
  id => options => bulk.update(id, 'building', options);
