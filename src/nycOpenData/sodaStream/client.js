const axios = require('axios')
  , csv = require('csv-stream')
  , qs = require('querystring');

const Filter = require('./filter')
  , RESOURCE_IDS = require('./resourceIds');

const BASE_URL = 'https://data.cityofnewyork.us/resource';

const create =
  appToken =>
    ({
      getRows: (type, filterOptions = {}) =>
        getRows(createAxios(appToken), type, filterOptions),
    });

const createAxios =
  appToken =>
    axios.create({
      baseURL: BASE_URL,
      headers: {
        'X-App-Token': appToken,
      },
    });

const getRows =
  (axios, type, filterOptions) =>
    getCount(axios, type, filterOptions)
      .then(
        count =>
          get(axios, type, 'csv', {
            ...resolveWhereObj(type, filterOptions),
            $limit: count
          })
      )
      .then(
        response =>
          response.data.pipe(csv.createStream({ enclosedChar: '"' }))
      );

const getCount =
  (axios, type, filterOptions) =>
    get(axios, type, 'json', {
      $select: 'count(*) as count',
      ...resolveWhereObj(type, filterOptions)
    }).then(response => parseInt(response.data[0].count));

const resolveWhereObj =
  (type, filterOptions) =>
    Filter.create(type, filterOptions) ? { $where: Filter.create(type, filterOptions) } : {};

const get =
  (axios, type, format, soql) =>
    axios.get(`/${RESOURCE_IDS[type]}.${format}${soql ? `?${qs.stringify(soql)}` : ''}`, {
      ...(format === 'csv' ? { responseType: 'stream' } : {})
    });

module.exports = {
  create
};
