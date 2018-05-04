const create =
  (type, options = {}) =>
    (require(`./${type}`))(options);

module.exports = {
  create,
};
