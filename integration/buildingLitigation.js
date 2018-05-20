/* eslint-disable no-console */
const { NycOpenData } = require('./../app/bootstrap');

const BulkOperation = require('./../src/bulkOperation')
  , Domain = require('./../src/domain');

const groupEntitiesByBuildingId = require('./groupEntitiesByBuildingId');

NycOpenData
  .create()
  .getStream('soda', 'litigation')
  .doAction(({ data }) => console.log(JSON.stringify(data)))
  .map(({ data }) => Domain.Litigation.fromSoda(data))
  .doAction(data => console.log(JSON.stringify(data)))
  .bufferWithTimeOrCount(100, 100)
  .onValue(litigations => {
    const bulkOperations = Object
      .entries(groupEntitiesByBuildingId(litigations))
      .map(([buildingId, litigations]) => BulkOperation.Building.upsertLitigations(buildingId, litigations));
    console.log(JSON.stringify(bulkOperations));
  });
