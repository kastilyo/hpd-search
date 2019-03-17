const Client = require('./client');

/**
 * A Client to file streams of XML files on the HPD website. They are stream unzipped from URLs
 * scraped from the website, making this very brittle to changes in the markup of that site.
 */
const create = () => {
  const client = Client.create();
  return {
    getBuildings: () => require('./getBuildings')(client),
    getComplaints: () => require('./getComplaints')(client),
    getOpenComplaints: () => require('./getOpenComplaints')(client),
    getRegistrations: () => require('./getRegistrations')(client),
  };
};

module.exports = {
  create
};
