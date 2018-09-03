const qs = require('querystring');

module.exports =
  client => resourceId =>
    client.get(`/${resourceId}.json?${qs.stringify({
      $select: 'count(*) as count',
    })}`).then(response => parseInt(response.data[0].count));
