const unzipper = require('unzipper')
  , cheerio = require('cheerio')
  , url = require('url');

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
  client => pagePath =>
    client.get(pagePath)
      .then(response => client.get(findLatestZipPath(cheerio.load(response.data)), {
        responseType: 'stream'
      }))
      .then(response => response.data.pipe(unzipper.ParseOne(/.*\.xml/)));

