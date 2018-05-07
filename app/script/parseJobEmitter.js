const { RabbitHole, NycOpenData } = require('./../bootstrap');

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
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


