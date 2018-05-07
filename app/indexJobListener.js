/* eslint-disable no-console */
const Bacon = require('baconjs');

const { RabbitHole } = require('./bootstrap');

const SearchClient = require('./../src/searchClient');

const BATCH_SIZE = 1000;
const BUFFER_TIMEOUT_MS = 5000;

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole.createJsonConsumer(process.env.RABBIT_HOLE_INDEX_QUEUE, {prefetch: BATCH_SIZE}),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  const searchClient = SearchClient.create();
  const messageStream = Bacon.fromBinder(sink => consumer.consume(({ message }) => sink(message)))
    .bufferWithTimeOrCount(BUFFER_TIMEOUT_MS, BATCH_SIZE);
  messageStream.onValue(messages => {
    const body = messages
      .reduce((bulkOperations, { json: { data, type } }) => [
        ...bulkOperations,
        { update: { _type: type, _id: data.id} },
        { doc: data, doc_as_upsert: true },
      ], []);

    searchClient.bulk(body)
      .then(result => publisher.publish('data.indexed', result))
      .then(() => Promise.all(messages.map(consumer.ack)));
  });
});


