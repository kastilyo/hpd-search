/* eslint-disable no-console */
const { RabbitHole, NycOpenData } = require('./../bootstrap');

const Domain = require('./../../src/domain');

const hydrateEntity =
  (type, source, data) =>
    Domain[upperFirst(type)][`from${upperFirst(source)}`](data);

const upperFirst =
  str =>
    str[0].toUpperCase() + str.slice(1);

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
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE, { JSON: require('circular-json')}),
  rabbitHole.createJsonConsumer(process.env.RABBIT_HOLE_PARSE_QUEUE),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  const nycOpenData = NycOpenData.create();

  consumer.consume(({ message, ack, nack }) => {
    const { source, type, filter } = message.json;

    if (!nycOpenData.isSupportedSource(source)) {
      console.log(`Unrecognized source, '${source}', provided`);
      return nack(message, false, false);
    }

    if (!nycOpenData.isSupportedType(source, type)) {
      console.log(`Unrecognized type, '${type}', provided`);
      return nack(message, false, false);
    }

    console.log(`Received message ${JSON.stringify(message.json)}`);

    const dataStream = nycOpenData.getStream(source, type, filter)
      .map(
        ({ type, source, data }) =>
          ({
            type,
            source,
            data: hydrateEntity(type, source, data)
          }))
      .doAction(
        ({ type, source, data }) =>
          `Parsed ${type} ID ${data.id} from ${source.toUpperCase()}`
      );

    dataStream.onValue(
      ({ data, type }) =>
        Promise.all(
          getRoutingKeys(type)
            .map(
              routingKey =>
                publisher.publish(routingKey, { type, data })
            )
        )
    );

    dataStream.onEnd(() => {
      console.log('Acking...');
      ack(message);
    });
  });
});


