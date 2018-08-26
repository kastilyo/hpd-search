/**
 * The `term` query finds documents that contain the exact term specified in the inverted index.
*/

module.exports = (field, value, boost = 1.0) => ({
  term: {
    [field]: {
      value,
      boost
    }
  }
});
