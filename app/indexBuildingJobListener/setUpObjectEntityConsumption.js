/* eslint-disable no-console */
const resolveQueue = require('./resolveQueue')
  , resolveBulkOperationBuilder = require('./resolveBulkOperationsBuilder');

module.exports =
  (rabbitHole, publisher, type) =>
    rabbitHole
      .createJsonConsumer(resolveQueue(type))
      .then(
        consumer =>
          consumer.consume(({ message, ack }) => {
            const building = message.json.data;
            console.log(`Received message for building ID ${building.id}`);
            publisher.publish('index', {
              operation: resolveBulkOperationBuilder(type)
            }).then(() => ack(message));
          })
      );
