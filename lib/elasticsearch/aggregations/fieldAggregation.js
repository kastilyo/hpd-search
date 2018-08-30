module.exports = aggregationType => (name, field, size = null) => ({
  [name]: {
    [aggregationType]: {
      ...size ? { size } : {},
      field,
    }
  }
});
