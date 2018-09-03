const axios = require('axios')
  , qs = require('querystring');

const create =
  host =>
    ({
      get: (type, params) =>
        axios.get(`${host}/${type}.json?${qs.stringify(params)}`)
          .then(response => response.data[type]),
    });

module.exports = {
  create
};
