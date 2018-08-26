module.exports = type => (...queries) => ({
  [type]: queries.length > 1 ? queries : queries[0],
});
