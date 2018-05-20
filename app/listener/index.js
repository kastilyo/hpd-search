/* eslint-disable no-console */
const Bacon = require('baconjs')
  , R = require('ramda');

const { RabbitHole } = require('./../bootstrap');

const SearchClient = require('./../../src/searchClient');

const BATCH_SIZE = 1000;
const BUFFER_TIMEOUT_MS = 30000;

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
              ({
                action,
                payload,
                result,
              })
          ).filter(({action, result}) => {
            const [type] = Object.keys(action);
            return result[type].error;
          }).map(message => publisher.publish('index-result', message));

    searchClient.bulk(operations)
      .then(results => Promise.all([
        publisher.publish('bulk-index-result', R.omit(['items'], results)),
        ...(results.errors ? publishIndexResults(publisher, operations, results) : []),
      ]))
      .then(() => console.log('Performed bulk operation. Acking...'))
      .then(() => Promise.all(messages.map(consumer.ack)));
  });
});
