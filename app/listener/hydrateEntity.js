/* eslint-disable no-console */
const { RabbitHole } = require('./../bootstrap');

const Domain = require('./../../src/domain');

const upperFirst =
  str =>
    str[0].toUpperCase() + str.slice(1);

const hydrateEntity =
  (type, source, data) =>
    Domain[upperFirst(type)][`from${upperFirst(source)}`](data);

const getRoutingKeys =
  type => {
    switch (type) {
    case 'building':
      return [
        'hydrate.bulk-upsert.building',
        'geocode.building',
      ];
    case 'violation':
      return [
        'hydrate.bulk-upsert.building-violation',
      ];
    case 'complaint':
      return [
        'hydrate.bulk-upsert.building-complaint',
      ];
    case 'registration':
      return [
        'hydrate.bulk-upsert.building-registration',
      ];
    case 'litigation':
      return [
        'hydrate.bulk-upsert.building-litigation',
      ];
    }
  };

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole.createJsonConsumer(process.env.RABBIT_HOLE_HYDRATE_ENTITY_QUEUE),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  consumer.consume(({ message, ack }) => {
    const {type, source, data} = message.json;
    const entity = hydrateEntity(type, source, data);
    console.log(`Hydrated ${type} ID ${entity.id} from ${source.toUpperCase()} data`);
    Promise.all(getRoutingKeys(type).map(routingKey => publisher.publish(routingKey, {
      type,
      data: entity,
    })))
      .then(() => console.log('Acking...'))
      .then(() => ack(message));
  });
});
