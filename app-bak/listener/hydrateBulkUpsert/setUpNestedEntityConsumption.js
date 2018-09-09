/* eslint-disable no-console */
const Bacon = require('baconjs');

const resolveQueue = require('./resolveQueue')
  , resolveBulkUpsertHydrator = require('./resolveBulkUpsertHydrator');

const groupEntitiesByBuildingId =
  messages =>
    messages.reduce(
      (groupedEntities, { json: { data } }) =>
        ({
          ...groupedEntities,
          [data.buildingId]: !groupedEntities[data.buildingId]
            ? [data]
            : [...groupedEntities[data.buildingId], data]
        }),
      {}
    );

module.exports =
  (rabbitHole, publisher, type, { size, timeoutMs }) =>
    rabbitHole.createJsonConsumer(resolveQueue(type), { prefetch: size })
      .then(consumer => {
        const messageStream = Bacon
          .fromBinder(sink => consumer.consume(({ message }) => sink(message)))
          .doAction(({ json: { type, data } }) => console.log(`Building bulk operation for ${type} ID ${data.id} belonging to building ID ${data.buildingId}`))
          .bufferWithTimeOrCount(timeoutMs, size);

        const bulkUpsertHydrator = resolveBulkUpsertHydrator(type);
        messageStream.onValue(messages => {
          const bulkOperations = Object
            .entries(groupEntitiesByBuildingId(messages))
            .map(
              ([buildingId, entities]) =>
                bulkUpsertHydrator(buildingId, entities)
            );

          Promise.all(bulkOperations.map(bulkOperation => publisher.publish('bulk', {
            operation: bulkOperation,
          })))
            .then(() => console.log('Acking messages...'))
            .then(() => Promise.all(messages.map(consumer.ack)));
        });
      });
