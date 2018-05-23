const axios = require('axios')
  , unzipper = require('unzipper')
  , cheerio = require('cheerio')
  , sax = require('sax-stream')
  , url = require('url');

const TAGS = require('./tags');

const BASE_URL = 'http://www1.nyc.gov';
const httpClient = axios.create({
  baseURL: BASE_URL,
});

const parseTagsByType =
  (type, pagePath) =>
    httpClient.get(pagePath)
      .then(response => scrapeLatestZip(response.data))
      .then(response => getTagStream(type, response.data));

const scrapeLatestZip =
  fileIndexHtml =>
    httpClient.get(findLatestZipPath(cheerio.load(fileIndexHtml)), {
      responseType: 'stream'
    });

const findLatestZipPath =
  $ =>
    $('.content-container a')
      .toArray()
      .map(anchor => anchor.attribs.href || '')
      .filter(href => /.*\d{8}\.zip/.test(href))
      .map(href => url.parse(href).path)
      .sort()
      .pop();

const getTagStream =
  (type, zipStream) =>
    zipStream
      .pipe(unzipper.ParseOne(/.*\.xml/))
      .pipe(sax({ strict: true, tag: TAGS[type] }));

module.exports = parseTagsByType;
