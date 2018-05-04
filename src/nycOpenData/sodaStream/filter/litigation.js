module.exports = ({borough = null, buildingId = null} = {}) => {
  const boroughFragment = borough
    ? `boroid = '${borough}'`
    : null;

  const buildingIdFragment = buildingId
    ? `buildingid = '${buildingId}'`
    : null;

  return [boroughFragment, buildingIdFragment].filter(fragment => fragment).join(' AND ');
};
