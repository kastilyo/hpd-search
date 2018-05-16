/* eslint-disable no-console */
const Bacon = require('baconjs');

const { RabbitHole } = require('./bootstrap');

const BulkOperation = require('./../src/bulkOperation');

const BATCH_SIZE = 20000;
const BUFFER_TIMEOUT_MS = 10000;

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole.createJsonConsumer(process.env.RABBIT_HOLE_INDEX_BUILDING_COMPLAINT_QUEUE, { prefetch: BATCH_SIZE }),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  const messageStream = Bacon.fromBinder(sink => consumer.consume(({ message }) => sink(message)))
    .bufferWithTimeOrCount(BUFFER_TIMEOUT_MS, BATCH_SIZE);

  messageStream.onValue(messages => {
    const complaintsByBuildingId = messages.reduce(
      (groupedEntities, { json: { data } }) =>
        ({
          ...groupedEntities,
          [data.buildingId]: !groupedEntities[data.buildingId]
            ? [data]
            : [...groupedEntities[data.buildingId], data]
        }),
      {}
    );

    const bulkOperations = Object.keys(complaintsByBuildingId)
      .map(buildingId => BulkOperation.Building.upsertComplaints(buildingId, complaintsByBuildingId[buildingId]));

    Promise.all(bulkOperations.map(bulkOperation => publisher.publish('index', {
      operation: bulkOperation,
    }))).then(() => Promise.all(messages.map(consumer.ack)));
  });
});


