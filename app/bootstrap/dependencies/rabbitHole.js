const RabbitHole = require('@kastilyo/rabbit-hole')
  , JSON = require('circular-json');

const create =
  () =>
    RabbitHole.create({
      vhost: process.env.RABBIT_HOLE_VHOST,
    }).then(rh => ({
      ...rh,
      createJsonPublisher: exchange =>
        rh.MiddlewarePublisher.create(exchange)
          .then(publisher => publisher.use(RabbitHole.Middleware.Publisher.json({ JSON }))),
      createJsonConsumer: (queue, options = {}) =>
        rh.MiddlewareConsumer.create(queue, options)
          .then(consumer => consumer.use(RabbitHole.Middleware.Consumer.json({ JSON })))
    }));

module.exports = {
  create,
};
