const isInt =
  test =>
    Number.isInteger(parseInt(test));

module.exports = ({ borough = null, buildingId = null } = {}) => {
  const boroIdFragment = borough && isInt(borough)
    ? `BoroID = '${borough}'`
    : null;

  const boroughFragment = borough && isInt(borough)
    ? `Borough = '${borough}'`
    : null;

  const buildingIdFragment = buildingId
    ? `BuildintID = '${buildingId}'`
    : null;

  return [boroIdFragment, boroughFragment, buildingIdFragment].filter(fragment => fragment).join(' AND ');
};
