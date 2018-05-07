/* eslint-disable no-console */
const { RabbitHole, NycOpenData } = require('./bootstrap');

const Transformer = require('./../src/transformer');

const transform =
  (type, source, data) => {
    const transformer = Transformer.create(type);
    switch(source) {
    case NycOpenData.SOURCES.XML:
      return transformer.fromXml(data);
    }
  };

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole.createJsonConsumer(process.env.RABBIT_HOLE_TRANSFORM_QUEUE),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  consumer.consume(({ message, ack }) => {
    const {type, source, data} = message.json;

    publisher.publish(`${type}-${source}.transformed`, {
      type,
      data: transform(type, source, data),
    }).then(() => ack(message));
  });
});
