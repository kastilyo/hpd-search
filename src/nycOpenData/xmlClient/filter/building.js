module.exports = ({ borough = null, id = null } = {}) =>
  xmlTagData => {
    const doesIdMatch = id
      ? `${id}` === xmlTagData.children.BuildingID.value
      : true;

    const {
      SeqNo: { value: seqNo },
      ShortName: { value: shortName },
      LongName: { value: longName },
    } = xmlTagData.children.Boro.children;
    const doesBoroughMatch =
      borough
        ? `${borough}` === seqNo
        || `${borough}`.toUpperCase() === shortName
        || `${borough}`.toUpperCase() === longName
        : true;

    return doesIdMatch && doesBoroughMatch;
  };
