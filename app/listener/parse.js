/* eslint-disable no-console */
const { RabbitHole, NycOpenData } = require('./../bootstrap');

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

    const dataStream = nycOpenData.getStream(source, type, filter);

    dataStream.onValue(data => publisher.publish('hydrate.entity', data));

    dataStream.onEnd(() => {
      console.log('Acking...');
      ack(message);
    });
  });
});

