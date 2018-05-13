/* eslint-disable no-console */
const Bacon = require('baconjs');

const { RabbitHole } = require('./bootstrap');

const SearchClient = require('./../src/searchClient');
const Repository = require('./../src/repository');

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
  const buildingRepository = Repository.Building.create(searchClient);

  const messageStream = Bacon.fromBinder(sink => consumer.consume(({ message }) => sink(message)))
    .bufferWithTimeOrCount(BUFFER_TIMEOUT_MS, BATCH_SIZE);

  const groupMessagesByType =
    messages =>
      messages.reduce((groupedMessages, message) => ({
        ...groupedMessages,
        [message.json.type]: [...groupedMessages[message.json.type], message],
      }), {
        building: [],
      });

  messageStream.onValue(messages => {
    const groupedMessages = groupMessagesByType(messages);

    const buildings = groupedMessages.building.map(buildingMessage => buildingMessage.json.data);

    buildings.length
      ? buildingRepository.upsert(...buildings)
        .then(result => publisher.publish('data.indexed', result))
        .then(() => Promise.all(groupedMessages.building.map(consumer.ack)))
      : [];
  });
});


