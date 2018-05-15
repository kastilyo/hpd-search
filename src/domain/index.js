const create =
  (type) => require(`./${type}`);

module.exports = {
  create,
};
