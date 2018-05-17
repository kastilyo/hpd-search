/* eslint-disable no-console */
const R = require('ramda')
  , cJSON = require('circular-json');

const { NycOpenData } = require('./../app/bootstrap');

const BulkOperation = require('./../src/bulkOperation')
  , Domain = require('./../src/domain');

const groupEntitiesByBuildingId = require('./groupEntitiesByBuilding');

NycOpenData
  .create()
  .getStream('xml', 'complaint')
  .map(R.tap(xml => console.log(cJSON.stringify(xml))))
  .map(({ data }) => Domain.Complaint.fromXml(data))
  .map(R.tap(complaint => console.log(JSON.stringify(complaint))))
  .bufferWithTimeOrCount(100, 100)
  .onValue(complaints => {
    const bulkOperations = Object
      .entries(groupEntitiesByBuildingId(complaints))
      .map(
        ([buildingId, complaints]) =>
          BulkOperation.Building.upsertComplaints(buildingId, complaints)
      );
    console.log(JSON.stringify(bulkOperations));
  });
