const fs = require('fs')
  , util = require('util');

const readFile = util.promisify(fs.readFile);

const readFileAndPut =
  client => id =>
    readFile(`${__dirname}/scripts/${id}.groovy`)
      .then(contents => contents.toString())
      .then(source => ({
        script: {
          lang: 'painless',
          source,
        }
      }))
      .then(body => client.putScript({
        id,
        body,
      }));

module.exports =
  client =>
    Promise.all(
      [
        'upsert-complaints-to-building',
        'upsert-violations-to-building',
        'upsert-litigations-to-building',
      ].map(readFileAndPut(client))
    );

