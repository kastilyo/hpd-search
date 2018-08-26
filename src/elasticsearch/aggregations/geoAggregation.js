module.exports = aggregationType => (name, field) => ({
  [name]: {
    [aggregationType]: {
      field,
    }
  }
});
