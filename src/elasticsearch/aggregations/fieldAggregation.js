module.exports = aggregationName => (name, field, size = null) => ({
  [name]: {
    [aggregationName]: {
      ...size ? { size } : {},
      field,
    }
  }
});
