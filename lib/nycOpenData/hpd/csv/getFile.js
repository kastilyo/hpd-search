const R = require('ramda')
  , qs = require('querystring')
  , { PassThrough } = require('stream')
  , getCount = require('./getCount');

module.exports =
  resourceId => client => {
    const passthrough = new PassThrough();
    const handleError = error => passthrough.destroy(error);

    const buildResourceUrl = (resourceId, count) => `/${resourceId}.csv?${qs.stringify({
      $limit: count
    })}`;

    (getCount(client))(resourceId)
      .then(count => client.get(buildResourceUrl(resourceId, count), { responseType: 'stream' }))
      .then(response => response.data)
      .then(R.tap(csvStream => csvStream.on('error', handleError)))
      .then(csvStream => csvStream.pipe(passthrough))
      .catch(handleError);

    return passthrough;
  };

