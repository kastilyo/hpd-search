const getFile = require('./getFile');

const PAGE_PATH = '/site/hpd/about/Complaints-open-data.page';

module.exports =
  client => getFile(client)(PAGE_PATH);
