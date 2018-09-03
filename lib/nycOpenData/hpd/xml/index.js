const Client = require('./client');

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
