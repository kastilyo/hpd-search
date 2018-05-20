/* eslint-disable no-console */
const resolveQueue = require('./resolveQueue')
  , resolveBulkOperationBuilder = require('./resolveBulkOperationsBuilder')
  , resolveBuildingId = require('./resolveBuildingId');

const TYPES = require('./types');

module.exports =
  (rabbitHole, publisher, type) =>
    rabbitHole
      .createJsonConsumer(resolveQueue(type))
      .then(
        consumer =>
          consumer.consume(({ message, ack }) => {
            const { type, data } = message.json;
            const buildingId = resolveBuildingId(type, data);
            const bulkOperationBuilder = resolveBulkOperationBuilder(type);
            const typeDescriptorFragment = type === TYPES.BUILDING ? ' ' : ` ${type} ID ${data.id} belonging to `;
            console.log(`Received message for${typeDescriptorFragment}building ID ${buildingId}`);
            publisher.publish('index', {
              operation: bulkOperationBuilder(data)
            }).then(() => ack(message));
          })
      );
