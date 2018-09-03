const unzipper = require('unzipper')
  , cheerio = require('cheerio')
  , R = require('ramda')
  , url = require('url')
  , { PassThrough } = require('stream');

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

    const handleError = error => passthrough.destroy(error);

    client.get(pagePath)
      .then(response => client.get(findLatestZipPath(cheerio.load(response.data)), {
        responseType: 'stream'
      }))
      .then(response => response.data)
      .then(R.tap(zipStream => zipStream.on('error', handleError)))
      .then(zipStream => zipStream.pipe(unzipper.ParseOne(/.*\.xml/)))
      .then(R.tap(xmlStream => xmlStream.on('error', handleError)))
      .then(xmlStream => xmlStream.pipe(passthrough))
      .catch(handleError);

    return passthrough;
  };


