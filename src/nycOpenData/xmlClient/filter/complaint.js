module.exports = ({ borough = null, buildingId = null } = {}) =>
  xmlTagData => {
    const doesIdMatch = buildingId
      ? `${buildingId}` === xmlTagData.children.BuildingID.value
      : true;

    const {
      SeqNo: { value: seqNo },
      ShortName: { value: shortName },
      LongName: { value: longName },
    } = xmlTagData.children.Borough.children;
    const doesBoroughMatch =
      borough
        ? `${borough}` === seqNo
        || `${borough}`.toUpperCase() === shortName
        || `${borough}`.toUpperCase() === longName
        : true;

    return doesIdMatch && doesBoroughMatch;
  };
