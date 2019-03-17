/* eslint-disable no-console */
require('../app/bootstrap');

const { Client } = require('@elastic/elasticsearch')
  , { DateTime } = require('luxon')
  , fs = require('fs')
  , util = require('util');

const mappings = require('./../src/elasticsearch/mappings');

const {
  ELASTICSEARCH_PROTOCOL,
  ELASTICSEARCH_HOST,
  ELASTICSEARCH_PORT,
} = process.env;

const readFile = util.promisify(fs.readFile);

((async function main() {
  const elasticsearch = new Client({
    node: `${ELASTICSEARCH_PROTOCOL}://${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}`
  });
  const baseIndexName = 'hpd';

  // create a new index with the mappings defined in the repo with a name derived from the
  // base index name and the current time
  const indexName = `${baseIndexName}-${DateTime.utc().toISODate()}`;
  await elasticsearch.indices.create({
    index: indexName,
    body: {
      mappings,
    },
  });

  // create stored scripts on the server
  const scriptsDir = `${__dirname}/../src/elasticsearch/scripts`;
  // these names must correspond to the scripts in the dir
  const scriptIds = [
    'upsert-complaints-to-building',
    'upsert-violations-to-building',
    'upsert-litigations-to-building',
  ];
  await Promise.all(scriptIds
    .map(async scriptId => {
      const contents = await readFile(`${scriptsDir}/${scriptId}.groovy`).then(contents => contents.toString());
      return elasticsearch.putScript({
        id: scriptId,
        body: {
          script: {
            lang: 'painless',
            source: contents,
          }
        }
      });
    })
  );

  // create an alias and give it to the newly created index
  await elasticsearch.indices.updateAliases({
    body: {
      actions: [
        { add: { index: indexName, alias: baseIndexName } }
      ]
    }
  });
})()).catch(error => console.log(error));
