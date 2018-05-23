/* eslint-disable no-console */
const JSON = require('circular-json');

const { NycOpenData } = require('./../app/bootstrap');

const BulkOperation = require('./../src/bulkOperation')
  , Domain = require('./../src/domain');

NycOpenData
  .create()
  .getStream('xml', 'registration')
  .doAction(({ data }) => console.log(JSON.stringify(data)))
  .map(({ data }) => Domain.Registration.fromXml(data))
  .doAction(data => console.log(JSON.stringify(data)))
  .map(BulkOperation.Building.upsertRegistration)
  .onValue(data => console.log(JSON.stringify(data)));
