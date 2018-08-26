module.exports = type => (...queries) => ({
  [type]: queries,
});
