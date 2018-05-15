/* eslint-disable no-console */
const { RabbitHole } = require('./bootstrap');

const Domain = require('./../src/domain');

const upperFirst =
  str =>
    str[0].toUpperCase() + str.slice(1);

const hydrateEntity =
  (type, source, data) =>
    Domain[upperFirst(type)][`from${upperFirst(source)}`](data);

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
    publisher.publish(`${type}.hydrated`, {
      type,
      data: hydrateEntity(type, source, data),
    }).then(() => ack(message));
  });
});
