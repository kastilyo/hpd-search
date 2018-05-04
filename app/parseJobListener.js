require('dotenv').config({
  path: `${__dirname}/../config/.env`
});

const RabbitHole = require('@kastilyo/rabbit-hole')
  , JSON = require('circular-json')
  , NycOpenData = require('./../src/nycOpenData');

RabbitHole.create({
  vhost: process.env.RABBIT_HOLE_VHOST,
}).then(rabbitHole => Promise.all([
  rabbitHole.MiddlewarePublisher.create(process.env.RABBIT_HOLE_EXCHANGE)
    .then(publisher => publisher.use(RabbitHole.Middleware.Publisher.json({ JSON }))),
  rabbitHole.MiddlewareConsumer.create(process.env.RABBIT_HOLE_PARSE_QUEUE)
    .then(consumer => consumer.use(RabbitHole.Middleware.Consumer.json({ JSON }))),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  const sodaStream = NycOpenData.SodaStream.create(process.env.SODA_APP_TOKEN);

  consumer.consume(({ message, ack, nack }) => {
    const [, typeSource] = message.fields.routingKey.split('.');
    const [type, source] = typeSource.split('-');

    if (source !== 'xml' && source !== 'soda') {
      console.log(`Unrecognized source, '${source}', provided`);
      return nack(message, false, false);
    }

    const supportedTypes = source === 'xml'
      ? NycOpenData.XmlStream.TYPES
      : NycOpenData.SodaStream.TYPES;

    if (Object.values(supportedTypes).indexOf(type) === -1) {
      console.log(`Unrecognized type, '${type}', provided`);
      return nack(message, false, false);
    }

    console.log(`Received message: ${JSON.stringify(message)}`);

    const filterOptions = message.json;

    const dataStream = source === 'xml'
      ? NycOpenData.XmlStream.get(type)
        .filter(NycOpenData.XmlStream.Filter.create(type, filterOptions))
      : sodaStream.get(type, filterOptions);

    dataStream.onEnd(() => {
      console.log('Finished parsing. Acking...');
      ack(message);
    });

    dataStream.onValue(data => publisher.publish(`${type}-${source}.parsed`, data));
  });
});


