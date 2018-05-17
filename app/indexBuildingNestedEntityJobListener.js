/* eslint-disable no-console */
const Bacon = require('baconjs');

const { RabbitHole } = require('./bootstrap');

const { Building } = require('./../src/bulkOperation');

const TYPES = {
  VIOLATION: 'violation',
  COMPLAINT: 'complaint',
};

const resolveQueue =
  type => {
    switch (type) {
    case TYPES.VIOLATION:
      return process.env.RABBIT_HOLE_INDEX_BUILDING_VIOLATION_QUEUE;
    case TYPES.COMPLAINT:
      return process.env.RABBIT_HOLE_INDEX_BUILDING_COMPLAINT_QUEUE;
    }
  };

const resolveBulkOperationBuilder =
  type => {
    switch (type) {
    case TYPES.VIOLATION:
      return Building.upsertViolations;
    case TYPES.COMPLAINT:
      return Building.upsertComplaints;
    }
  };

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

const create =
  ({
    type,
    buffer: { size, timeoutMs }
  }) => {
    const bulkOperationBuilder = resolveBulkOperationBuilder(type);
    RabbitHole.create().then(rabbitHole => Promise.all([
      rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
      rabbitHole.createJsonConsumer(resolveQueue(type)),
      rabbitHole,
    ])).then(([publisher, consumer, rabbitHole]) => {
      console.log('Listening...');

      process.once('SIGINT', () => {
        console.log('Closing...');
        rabbitHole.close();
      });

      const messageStream = Bacon
        .fromBinder(sink => consumer.consume(({ message }) => sink(message)))
        .bufferWithTimeOrCount(timeoutMs, size);

      messageStream.onValue(messages => {
        const entitiesByBuildingId = groupEntitiesByBuildingId(messages);

        const bulkOperations = Object
          .keys(entitiesByBuildingId)
          .map(buildingId => bulkOperationBuilder(buildingId, entitiesByBuildingId[buildingId]));

        Promise.all(bulkOperations.map(bulkOperation => publisher.publish('index', {
          operation: bulkOperation,
        }))).then(() => Promise.all(messages.map(consumer.ack)));
      });
    });
  };

module.exports = {
  create,
  TYPES,
};
