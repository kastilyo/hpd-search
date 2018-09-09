/* eslint-disable no-console */
const resolveQueue = require('./resolveQueue')
  , resolveBulkUpsertHydrator = require('./resolveBulkUpsertHydrator')
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
            const bulkUpsertHydrator = resolveBulkUpsertHydrator(type);
            const typeDescriptorFragment = type === TYPES.BUILDING ? ' ' : ` ${type} ID ${data.id || buildingId} belonging to `;
            console.log(`Received message for${typeDescriptorFragment}building ID ${buildingId}`);
            publisher.publish('bulk', {
              operation: bulkUpsertHydrator(data)
            }).then(() => ack(message));
          })
      );
