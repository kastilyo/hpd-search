module.exports = aggregationName => (name, field) => ({
  [name]: {
    [aggregationName]: { field }
  }
});
