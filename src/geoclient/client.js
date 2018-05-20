const axios = require('axios')
  , R  = require('ramda')
  , qs = require('querystring');

const create =
  host =>
    ({
      get: (type, params) =>
        axios.get(`${host}/${type}.json?${qs.stringify(R.reject(R.isNil, params))}`)
          .then(response => response.data[type]),
    });

module.exports = {
  create
};
