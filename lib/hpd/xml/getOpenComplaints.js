const getFile = require('./getFile');

/**
 * This is actually the HPD Open Data landing page. Assumes that the only link to a zip file is the
 * one to "View All Open Complaints"
 */
const PAGE_PATH = '/site/hpd/about/open-data.page';

module.exports =
  client => getFile(client)(PAGE_PATH);
