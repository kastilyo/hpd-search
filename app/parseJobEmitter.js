require('dotenv').config({
  path: `${__dirname}/../config/.env`
});

const RabbitHole = require('@kastilyo/rabbit-hole')
  , NycOpenData = require('./../src/nycOpenData');

RabbitHole.create({
  vhost: process.env.RABBIT_HOLE_VHOST,
}).then(rabbitHole => Promise.all([
  rabbitHole.MiddlewarePublisher.create(process.env.RABBIT_HOLE_EXCHANGE)
    .then(publisher => publisher.use(RabbitHole.Middleware.Publisher.json({ JSON }))),
  rabbitHole,
])).then(([publisher, rabbitHole]) => {
  const routingKeys = [
    ['xml', NycOpenData.TYPES.XML],
    ['soda', NycOpenData.TYPES.SODA],
  ].reduce(
    (routingKeys, [source, TYPES]) =>
      [
        ...routingKeys,
        ...Object.values(TYPES).map(type => `parse.${type}-${source}`)
      ]
    ,
    []
  );

  return Promise.all(
    routingKeys.map(routingKey => publisher.publish(routingKey, {}))
  ).then(() => rabbitHole.close());
});


