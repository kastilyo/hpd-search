/* eslint-disable no-console */
const JSON = require('circular-json');

const { NycOpenData } = require('./../app/bootstrap');

const BulkOperation = require('./../src/bulkOperation')
  , Domain = require('./../src/domain');

NycOpenData
  .create()
  .getStream('xml', 'building')
  .doAction(xml => console.log(JSON.stringify(xml)))
  .map(({ data }) => Domain.Building.fromXml(data))
  .doAction(building => console.log(JSON.stringify(building)))
  .map(BulkOperation.Building.upsert)
  .onValue(building => console.log(JSON.stringify(building)));
