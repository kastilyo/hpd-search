/* eslint-disable no-console */
const R = require('ramda');

const { NycOpenData } = require('./../app/bootstrap');

const BulkOperation = require('./../src/bulkOperation')
  , Domain = require('./../src/domain');

const groupEntitiesByBuildingId = require('./groupEntitiesByBuilding');

NycOpenData
  .create()
  .getStream('soda', 'violation')
  .map(R.tap(soda => console.log(JSON.stringify(soda))))
  .map(({ data }) => Domain.Violation.fromSoda(data))
  .map(R.tap(violation => console.log(JSON.stringify(violation))))
  .bufferWithTimeOrCount(100, 100)
  .onValue(violations => {
    const bulkOperations = Object
      .entries(groupEntitiesByBuildingId(violations))
      .map(([buildingId, violations]) => BulkOperation.Building.upsertViolations(buildingId, violations));
    console.log(JSON.stringify(bulkOperations));
  });
