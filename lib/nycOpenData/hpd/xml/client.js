const axios = require('axios');

const BASE_URL = 'http://www1.nyc.gov';

const create = () => axios.create({
  baseURL: BASE_URL,
});

module.exports = {
  create,
};
