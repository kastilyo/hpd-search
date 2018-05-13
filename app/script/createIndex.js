/* eslint-disable no-console */
const SearchClient = require('./../../src/searchClient');

const searchClient = SearchClient.create();
searchClient.createIndexAndSetAlias().then(data => console.log(data));
