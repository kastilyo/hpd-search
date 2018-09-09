const Rx = require('rxjs')
  , Hpd = require('./../lib/hpd')
  , Feed = require('./../src-2/feed');

const SODA_APP_TOKEN = 'REPLACE_ME';

const feed = Feed.create(Hpd.create({ sodaAppToken: SODA_APP_TOKEN }));

Rx.merge(
  feed.building$(),
  feed.complaint$(),
  feed.litigation$(),
  feed.registration$(),
  feed.violation$(),
).subscribe(
  data => console.log(data),
  error => console.error('An error occurred somewhere', error)
);
