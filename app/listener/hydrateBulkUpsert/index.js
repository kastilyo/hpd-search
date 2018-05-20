/* eslint-disable no-console */

const { RabbitHole } = require('./../../bootstrap');

const setUpObjectEntityConsumption = require('./setUpObjectEntityConsumption')
  , setUpNestedEntityConsumption = require('./setUpNestedEntityConsumption');

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole,
])).then(([publisher, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  setUpObjectEntityConsumption(rabbitHole, publisher, 'building');
  setUpObjectEntityConsumption(rabbitHole, publisher, 'registration');
  setUpObjectEntityConsumption(rabbitHole, publisher, 'geosupport-data');
  setUpNestedEntityConsumption(rabbitHole, publisher, 'complaint', {
    size: 20000,
    timeoutMs: 10000,
  });
  setUpNestedEntityConsumption(rabbitHole, publisher, 'violation', {
    size: 10000,
    timeoutMs: 10000,
  });
  setUpNestedEntityConsumption(rabbitHole, publisher, 'litigation', {
    size: 20000,
    timeoutMs: 10000,
  });
});


