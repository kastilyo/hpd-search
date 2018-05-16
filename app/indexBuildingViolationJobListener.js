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
    const violationsByBuildingId = messages.reduce(
      (groupedItems, { json: { data } }) =>
        ({
          ...groupedItems,
          [data.buildingId]: !groupedItems[data.buildingId]
            ? [data]
            : [...groupedItems[data.buildingId], data]
        }),
      {}
    );

    const bulkOperations = Object.keys(violationsByBuildingId)
      .map(
        buildingId =>
          BulkOperation.Building.upsertViolations(
            buildingId,
            violationsByBuildingId[buildingId]
          )
      );

    Promise.all(bulkOperations.map(bulkOperation => publisher.publish('index', {
      operation: bulkOperation,
    }))).then(() => Promise.all(messages.map(consumer.ack)));
  });
});
