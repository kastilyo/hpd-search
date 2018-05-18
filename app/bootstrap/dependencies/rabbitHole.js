const RabbitHole = require('@kastilyo/rabbit-hole');

const create =
  () =>
    RabbitHole.create({
      vhost: process.env.RABBIT_HOLE_VHOST,
    }).then(rh => ({
      ...rh,
      createJsonPublisher: (exchange, jsonMiddlewareOptions = {}) =>
        rh.MiddlewarePublisher.create(exchange)
          .then(publisher => publisher.use(RabbitHole.Middleware.Publisher.json(jsonMiddlewareOptions))),
      createJsonConsumer: (queue, options = {}) =>
        rh.MiddlewareConsumer.create(queue, options)
          .then(consumer => consumer.use(RabbitHole.Middleware.Consumer.json()))
    }));

module.exports = {
  create,
};
