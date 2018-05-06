const { RabbitHole, NycOpenData } = require('./bootstrap');

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
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
    const [, typeSource] = message.fields.routingKey.split('.');
    const [type, source] = typeSource.split('-');

    if (!nycOpenData.isSupportedSource(source)) {
      console.log(`Unrecognized source, '${source}', provided`);
      return nack(message, false, false);
    }

    if (!nycOpenData.isSupportedType(source, type)) {
      console.log(`Unrecognized type, '${type}', provided`);
      return nack(message, false, false);
    }

    console.log(`Received message: ${JSON.stringify(message)}`);

    const filterOptions = message.json;
    const dataStream = nycOpenData.getStream(source, type, filterOptions);

    dataStream.onEnd(() => {
      console.log('Finished parsing. Acking...');
      ack(message);
    });

    dataStream.onValue(data => publisher.publish(`${type}-${source}.parsed`, data));
  });
});


