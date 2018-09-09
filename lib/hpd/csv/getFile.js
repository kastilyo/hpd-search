const qs = require('querystring')
  , { PassThrough } = require('stream')
  , getCount = require('./getCount');

module.exports =
  resourceId => client => {
    const passthrough = new PassThrough();

    const buildResourceUrl = (resourceId, count) => `/${resourceId}.csv?${qs.stringify({
      $limit: count
    })}`;

    (getCount(client))(resourceId)
      .then(count => client.get(buildResourceUrl(resourceId, count), { responseType: 'stream' }))
      .then(response => response.data)
      .then(csvStream => csvStream.pipe(passthrough))
      .catch(error => passthrough.emit('error', error));

    return passthrough;
  };

