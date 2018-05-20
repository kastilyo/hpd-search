/* eslint-disable no-console */
const Bacon = require('baconjs')
  , R = require('ramda');

const { RabbitHole } = require('./../bootstrap');

const SearchClient = require('./../../src/searchClient');

const BATCH_SIZE = 5000;
const BUFFER_TIMEOUT_MS = 15000;

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole.createJsonConsumer(process.env.RABBIT_HOLE_INDEX_QUEUE, { prefetch: BATCH_SIZE }),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  const searchClient = SearchClient.create();

  const messageStream = Bacon.fromBinder(sink => consumer.consume(({ message }) => sink(message)))
    .doAction(({json: {operation: [action]}}) => console.log(`Will perform bulk ${JSON.stringify(action)}`))
    .bufferWithTimeOrCount(BUFFER_TIMEOUT_MS, BATCH_SIZE);

  messageStream.onValue(messages => {
    const operations = messages.reduce(
      (operations, message) =>
        [
          ...operations,
          ...message.json.operation,
        ],
      []
    );

    const publishIndexResults =
      (publisher, operations, results) =>
        R.zip(R.splitEvery(2, operations), results.items)
          .map(
            ([[action, payload], result]) =>
              publisher.publish('index-result', {
                action,
                payload,
                result,
              }));

    searchClient.bulk(operations)
      .then(results => Promise.all([
        publisher.publish('bulk-index-result', R.omit(['items'], results)),
        ...(results.errors ? publishIndexResults(publisher, operations, results) : []),
      ]))
      .then(() => console.log('Performed bulk operation. Acking...'))
      .then(() => Promise.all(messages.map(consumer.ack)));
  });
});
