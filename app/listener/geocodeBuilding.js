/* eslint-disable no-console */
const { RabbitHole, Geoclient } = require('./../bootstrap');

const geoclient = Geoclient.create();

const getGeosupportData =
  building => Promise.all([
    geoclient.address({
      houseNumber: building.houseNumber,
      street: building.streetName,
      borough: building.borough,
      zip: building.postalCode,
    }),
    geoclient.bbl({
      borough: building.borough,
      block: building.block,
      lot: building.lot,
    }),
    geoclient.bin({
      bin: building.bin,
    }),
  ]).then(([address, bbl, bin]) => ({
    address,
    bbl,
    bin,
  }));

RabbitHole.create().then(rabbitHole => Promise.all([
  rabbitHole.createJsonPublisher(process.env.RABBIT_HOLE_EXCHANGE),
  rabbitHole.createJsonConsumer(process.env.RABBIT_HOLE_GEOCODE_BUILDING_QUEUE),
  rabbitHole,
])).then(([publisher, consumer, rabbitHole]) => {
  console.log('Listening...');

  process.once('SIGINT', () => {
    console.log('Closing...');
    rabbitHole.close();
  });

  consumer.consume(({ message, ack }) => {
    const building = message.json.data;

    console.log(`Received building ID ${building.id} to geocode`);

    getGeosupportData(building)
      .then(data => publisher.publish('hydrate.bulk-upsert.building-geosupport-data', data))
      .then(() => console.log(`Geocoded building ID ${building.id}. Acking...`))
      .then(() => ack(message));
  });
});


