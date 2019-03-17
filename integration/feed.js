require('./../app/bootstrap');

const Rx = require('rxjs')
  , Hpd = require('./../lib/hpd')
  , Feed = require('./../src/feed');

const feed = Feed.create(Hpd.create({ sodaAppToken: process.env.SODA_APP_TOKEN }));

Rx.merge(
  feed.building$(),
  feed.complaint$(),
  feed.litigation$(),
  feed.registration$(),
  feed.violation$(),
)
  .subscribe(
    data => console.log(data),
    error => console.error('An error occurred somewhere', error)
  );
