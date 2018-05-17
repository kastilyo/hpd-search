/* eslint-disable no-console */
const { RabbitHole } = require('./bootstrap');

const BulkOperation = require('./../src/bulkOperation');

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole.createJsonConsumer(process.env.RABBIT_HOLE_INDEX_BUILDING_QUEUE),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  consumer.consume(({ message, ack }) => {
    const building = message.json.data;
    console.log(`Received message for building ID ${building.id}`);
    publisher.publish('index', {
      operation: BulkOperation.Building.upsert(building)
    }).then(() => ack(message));
  });
});

