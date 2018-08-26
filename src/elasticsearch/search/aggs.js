module.exports = (...aggs) => ({
  aggs: aggs.reduce((prev, curr) => ({
    ...curr,
    ...prev,
  }), {})
});
