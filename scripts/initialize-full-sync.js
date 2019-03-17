/* eslint-disable no-console */
require('../app/bootstrap');

const amqp = require('amqplib');

const {
  TYPE_BUILDING,
  TYPE_VIOLATION,
  TYPE_REGISTRATION,
  TYPE_LITIGATION,
  TYPE_COMPLAINT,
} = require('./../src/entities');

const {
  AMQP_VHOST,
  AMQP_HOSTNAME,
  AMQP_PORT,
  AMQP_USERNAME,
  AMQP_PASSWORD,
} = process.env;

((async function main() {
  const connection = await amqp.connect({
    hostname: AMQP_HOSTNAME,
    port: AMQP_PORT,
    username: AMQP_USERNAME,
    password: AMQP_PASSWORD,
    vhost: AMQP_VHOST,
  });

  const channel = await connection.createChannel();

  const tearDown = () => channel.close().then(() => connection.close());

  process.once('SIGINT', () => {
    tearDown();
  });

  const exchangeName = 'hpd';

  const types = [
    TYPE_BUILDING,
    TYPE_VIOLATION,
    TYPE_REGISTRATION,
    TYPE_LITIGATION,
    TYPE_COMPLAINT,
  ];

  await Promise.all(types.map(type => channel.publish(
    exchangeName,
    `parse.${type}`,
    Buffer.from(JSON.stringify({
      // empty body (for now?)
    })),
    {
      contentType: 'application/json'
    }
  )));

  await tearDown();
})()).catch(error => console.log(error));
