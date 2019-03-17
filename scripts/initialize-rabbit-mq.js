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

// certain operations are done via the management REST API. the rest are through the package
const managementApi = axios.create({
  baseURL: `http://${AMQP_HOSTNAME}:${AMQP_MANAGEMENT_PORT}/api/`,
  auth: { username: AMQP_USERNAME, password: AMQP_PASSWORD }
});

const flatten = (toFlattens) => toFlattens.reduce(
  (flattened, toFlatten) => [...flattened, ...toFlatten],
  []
);

((async function main() {
  // first, create the vhost
  await managementApi.put(`vhosts/${AMQP_VHOST}`);

  // set vhost permissions to *.*.* for user
  await managementApi.put(`permissions/${AMQP_VHOST}/${AMQP_USERNAME}`, {
    vhost: AMQP_VHOST,
    username: AMQP_USERNAME,
    configure: '.*',
    write: '.*',
    read: '.*'
  });

  // create an ha-mode: all policy named ha-all
  await managementApi.put(`policies/${AMQP_VHOST}/ha-all`, {
    pattern: `^${exchangeName}`,
    definition: {
      'ha-mode': 'all'
    }
  });

  const connection = await amqp.connect({
    hostname: AMQP_HOSTNAME,
    port: AMQP_PORT,
    username: AMQP_USERNAME,
    password: AMQP_PASSWORD,
    vhost: AMQP_VHOST,
  });

  const channel = await connection.createChannel();

  // create exchanges
  const exchangeOptions = { durable: true, auto_delete: false };
  const exchangeType = 'topic';
  await Promise.all([
    channel.assertExchange(exchangeName, exchangeType, exchangeOptions),
    channel.assertExchange(`${exchangeName}-dead`, exchangeType, exchangeOptions)
  ]);

  // create the queues and their corresponding dead letter queues
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

  // create regular queue bindings
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

  // create dead queue bindings
  await Promise.all(queueNames.map(
    queueName => channel.bindQueue(`${queueName}-dead`, `${exchangeName}-dead`, queueName))
  );

  // teardown
  await channel.close();
  await connection.close();
})()).catch(error => console.log(error));
