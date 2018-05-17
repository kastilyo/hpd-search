/* eslint-disable no-console */
const R = require('ramda')
  , JSON = require('circular-json');

const { NycOpenData } = require('./../app/bootstrap');

const BulkOperation = require('./../src/bulkOperation')
  , Domain = require('./../src/domain');

NycOpenData
  .create()
  .getStream('xml', 'building')
  .onValue(R.pipe(
    R.tap(xml => console.log(JSON.stringify(xml))),
    ({ data }) => Domain.Building.fromXml(data),
    R.tap(building => console.log(JSON.stringify(building))),
    BulkOperation.Building.upsert,
    R.tap(building => console.log(JSON.stringify(building))),
  ));
