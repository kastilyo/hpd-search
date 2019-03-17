/* eslint-disable no-console */
require('../bootstrap');

const amqp = require('amqplib');

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

  process.once('SIGINT', async () => {
    await channel.close()
    await connection.close();
  });

  channel.consume('parse', message => {
    if (
      !message.properties.hasOwnProperty('contentType')
      || message.properties.contentType !== 'application/json'
    ) {
      throw new Error(`JSON-encoded messages are expected to have the content_type header property set to 'application/json'`);
    }
    const payload = JSON.parse(message.content.toString());
    channel.ack(message, false);
  });
})()).catch(error => console.log(error));
