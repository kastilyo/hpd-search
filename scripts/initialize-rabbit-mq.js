/* eslint-disable no-console */
require('../app/bootstrap');

const amqp = require('amqplib')
  , axios = require('axios');

const {
  AMQP_VHOST,
  AMQP_HOSTNAME,
  AMQP_PORT,
  AMQP_MANAGEMENT_PORT,
  AMQP_USERNAME,
  AMQP_PASSWORD,
} = process.env;

const exchangeName = 'hpd';
const queueNames = [
  'parse',
  'geoclient',
  'search-operation',
  'search-index',
];

const managementApi = axios.create({
  baseURL: `http://${AMQP_HOSTNAME}:${AMQP_MANAGEMENT_PORT}/api/`,
  auth: { username: AMQP_USERNAME, password: AMQP_PASSWORD }
});

const flatten = (toFlattens) => toFlattens.reduce(
  (flattened, toFlatten) => [...flattened, ...toFlatten],
  []
);

// first, create the vhost
managementApi.put(`vhosts/${AMQP_VHOST}`)
  // set vhost permissions to *.*.* for user
  .then(() => managementApi.put(`permissions/${AMQP_VHOST}/${AMQP_USERNAME}`, {
    vhost: AMQP_VHOST,
    username: AMQP_USERNAME,
    configure: '.*',
    write: '.*',
    read: '.*'
  }))
  // create an ha-mode: all policy named ha-all
  .then(() => managementApi.put(`policies/${AMQP_VHOST}/ha-all`, {
    pattern: `^${exchangeName}`,
    definition: {
      'ha-mode': 'all'
    }
  }))
  .then(() => amqp.connect({
    hostname: AMQP_HOSTNAME,
    port: AMQP_PORT,
    username: AMQP_USERNAME,
    password: AMQP_PASSWORD,
    vhost: AMQP_VHOST,
  }))
  .then(connection => connection.createChannel()
    .then(async channel => {
      const exchangeOptions = { durable: true, auto_delete: false };
      const type = 'topic';
      await Promise.all([
        channel.assertExchange(exchangeName, type, exchangeOptions),
        channel.assertExchange(`${exchangeName}-dead`, type, exchangeOptions)
      ]);
      return channel;
    })
    // create the queues and their corresponding dead letter queues
    .then(async channel => {
      const queueOptions = { durable: true, auto_delete: false };
      await Promise.all(flatten(queueNames.map(queueName => [
        channel.assertQueue(queueName, {
          ...queueOptions,
          arguments: {
            'x-dead-letter-routing-key': queueName,
            'x-dead-letter-exchange': `${exchangeName}-dead`,
          }
        }),
        channel.assertQueue(`${queueName}-dead`, queueOptions),
      ])));
      return channel;
    })
    // create regular queue bindings
    .then(async channel => {
      // create the queues and their corresponding dead letter queues
      const queueNamesAndBindings = [
        ['parse', [
          'parse.*'
        ]],
        ['geoclient', [
          'building.parsed'
        ]],
        ['search-operation', [
          'hydrate-bulk-upsert'
        ]],
        ['search-index', [
          'bulk-upsert-hydrated'
        ]],
      ];
      await Promise.all(flatten(queueNamesAndBindings.map(
        ([queueName, bindings]) => bindings.map(binding => channel.bindQueue(queueName, exchangeName, binding))
      )));
      return channel;
    })
    // create dead queue bindings
    .then(channel => Promise.all(queueNames.map(queueName => channel.bindQueue(`${queueName}-dead`, `${exchangeName}-dead`, queueName))).then(() => channel))
    .then(channel => channel.close())
    .then(() => connection.close())
  )
  .catch(error => console.log(error));
