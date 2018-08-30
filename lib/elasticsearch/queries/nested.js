module.exports = (path, query, scoreMode = null) => ({
  nested: {
    path,
    query,
    ...scoreMode ? { scoreMode } : {},
  }
});
