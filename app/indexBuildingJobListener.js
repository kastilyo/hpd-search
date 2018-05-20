/* eslint-disable no-console */
const Bacon = require('baconjs');

const { RabbitHole } = require('./bootstrap');

const { Building } = require('./../src/bulkOperation');

const TYPES = {
  VIOLATION: 'violation',
  COMPLAINT: 'complaint',
  LITIGATION: 'litigation',
  BUILDING: 'building',
  REGISTRATION: 'registration',
};

const resolveQueue =
  type => {
    switch (type) {
    case TYPES.BUILDING:
      return process.env.RABBIT_HOLE_INDEX_BUILDING_QUEUE;
    case TYPES.REGISTRATION:
      return process.env.RABBIT_HOLE_INDEX_BUILDING_REGISTRATION_QUEUE;
    case TYPES.VIOLATION:
      return process.env.RABBIT_HOLE_INDEX_BUILDING_VIOLATION_QUEUE;
    case TYPES.COMPLAINT:
      return process.env.RABBIT_HOLE_INDEX_BUILDING_COMPLAINT_QUEUE;
    case TYPES.LITIGATION:
      return process.env.RABBIT_HOLE_INDEX_BUILDING_LITIGATION_QUEUE;
    }
  };

const resolveBulkOperationBuilder =
  type => {
    switch (type) {
    case TYPES.BUILDING:
      return Building.upsert;
    case TYPES.REGISTRATION:
      return Building.upsertRegistration;
    case TYPES.VIOLATION:
      return Building.upsertViolations;
    case TYPES.COMPLAINT:
      return Building.upsertComplaints;
    case TYPES.LITIGATION:
      return Building.upsertLitigations;
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

const setUpNestedEntityConsumption =
  (rabbitHole, publisher, type, { size, timeoutMs } ) =>
    rabbitHole.createJsonConsumer(resolveQueue(type), { prefetch: size })
      .then(consumer => {
        const messageStream = Bacon
          .fromBinder(sink => consumer.consume(({ message }) => sink(message)))
          .doAction(({ json: { type, data } }) => console.log(`Building bulk operation for ${type} ID ${data.id}`))
          .bufferWithTimeOrCount(timeoutMs, size);

        const bulkOperationBuilder = resolveBulkOperationBuilder(type);
        messageStream.onValue(messages => {
          const bulkOperations = Object
            .entries(groupEntitiesByBuildingId(messages))
            .map(
              ([buildingId, entities]) =>
                bulkOperationBuilder(buildingId, entities)
            );

          Promise.all(bulkOperations.map(bulkOperation => publisher.publish('index', {
            operation: bulkOperation,
          })))
            .then(() => console.log('Acking messages...'))
            .then(() => Promise.all(messages.map(consumer.ack)));
        });
      });

const setUpObjectEntityConsumption =
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

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole,
])).then(([publisher, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  setUpObjectEntityConsumption(rabbitHole, publisher, 'building');
  setUpObjectEntityConsumption(rabbitHole, publisher, 'registration');
  setUpNestedEntityConsumption(rabbitHole, publisher, 'complaint', {
    size: 20000,
    timeoutMs: 10000,
  });
  setUpNestedEntityConsumption(rabbitHole, publisher, 'violation', {
    size: 10000,
    timeoutMs: 10000,
  });
  setUpNestedEntityConsumption(rabbitHole, publisher, 'litigation', {
    size: 20000,
    timeoutMs: 10000,
  });
});


