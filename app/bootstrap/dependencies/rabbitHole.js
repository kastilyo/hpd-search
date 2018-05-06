const RabbitHole = require('@kastilyo/rabbit-hole')
  , JSON = require('circular-json');

const create =
  () =>
    RabbitHole.create({
      vhost: process.env.RABBIT_HOLE_VHOST,
    }).then(rh => ({
      ...rh,
      createJsonPublisher: (exchange, options = {}) =>
        rh.MiddlewarePublisher.create(exchange, options)
          .then(publisher => publisher.use(RabbitHole.Middleware.Publisher.json({ JSON }))),
      createJsonConsumer: queue =>
        rh.MiddlewareConsumer.create(queue)
          .then(consumer => consumer.use(RabbitHole.Middleware.Consumer.json({ JSON })))
    }));

module.exports = {
  create,
};
