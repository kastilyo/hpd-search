const axios = require('axios');

const BASE_URL = 'https://data.cityofnewyork.us/resource';

const create = appToken =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-App-Token': appToken,
    },
  });

module.exports = {
  create,
};
