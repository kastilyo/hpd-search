const { search, queries, aggregations } = require('./src/elasticsearch')
  , { building } = require('./src/query')
  , axios = require('axios');

const buildingRepository = axios.create({
  baseURL: 'http://localhost:9200/hpd/_search',
  method: 'post',
});

const buildingSearch = search({
  size: 10,
  ...search.query(queries.bool({
    ...queries.bool.filter(
      building.clauses.inBrooklyn(),
      building.clauses.hasViolations(),
      building.clauses.hasComplaints(),
      building.clauses.hasRegistration(),
      building.clauses.hasLitigations(),
    )
  })),
  ...search.aggs(
    building.aggregations.centroid(),
    building.aggregations.viewport(),
    aggregations.terms('borough', 'borough', 1000),
    aggregations.terms('censusTract', 'censusTract', 1000),
    aggregations.terms('class', 'class', 1000),
    aggregations.terms('communityBoard', 'communityBoard', 1000),
    aggregations.terms('management', 'management', 1000),
    aggregations.terms('postalCode', 'postalCode', 1000),
    aggregations.terms('status', 'status', 1000),
  )
});

const jsonPrettify = data => console.log(JSON.stringify(data, null, '  '));

jsonPrettify(buildingSearch);

buildingRepository({
  data: buildingSearch,
}).then(response => jsonPrettify(response.data.aggregations))
  .catch(e => jsonPrettify(e.response.data.error));

