const unzip = require('unzip-stream')
  , cheerio = require('cheerio')
  , url = require('url')
  , { PassThrough, Transform } = require('stream');

/**
 * eg. Buildings20180801.zip
 */
const ZIP_PATTERN = /.*\d{8}\.zip/;

const findLatestZipPath =
  $ =>
    $('.content-container a')
      .toArray()
      .map(anchor => anchor.attribs.href || '')
      .filter(href => ZIP_PATTERN.test(href))
      .map(href => url.parse(href).path)
      .sort()
      .pop();


module.exports =
  client => pagePath => {
    const passthrough = new PassThrough();

    client.get(pagePath)
      .then(response => client.get(findLatestZipPath(cheerio.load(response.data)), {
        responseType: 'stream'
      }))
      .then(response => response.data)
      .then(zipStream => zipStream.pipe(unzip.Parse()).pipe(new Transform({
        objectMode: true,
        transform: entry => /.*\.xml/.test(entry.path) ? entry.pipe(passthrough) : entry.autodrain()
      })))
      .catch(error => passthrough.emit('error', error));

    return passthrough;
  };


