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

  consumer.consume(({ message, ack, nack }) => {
    const [, typeSource] = message.fields.routingKey.split('.');
    const [type, source] = typeSource.split('-');

    if (source !== 'xml') {
      console.log(`Unrecognized source, '${source}', provided`);
      return nack(message, false, false);
    }

    if (Object.values(NycOpenData.XmlClient.TYPES).indexOf(type) === -1) {
      console.log(`Unrecognized type, '${type}', provided`);
      return nack(message, false, false);
    }

    console.log(`Received message: ${JSON.stringify(message)}`);

    const filterOptions = message.json;
    const xmlDataStream = NycOpenData.XmlClient.getStream(type)
      .filter(NycOpenData.XmlClient.Filter.create(type, filterOptions));

    xmlDataStream.onEnd(() => {
      console.log('Finished parsing. Acking...');
      ack(message);
    });
    xmlDataStream.onValue(data => publisher.publish(`${type}-xml.parsed`, data));
  });
});


