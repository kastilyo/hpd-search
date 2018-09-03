const Xml = require('./xml')
  , Csv = require('./csv');

const create = ({sodaAppToken}) => {
  const xml = Xml.create();
  const csv = Csv.create(sodaAppToken);

  return {
    getViolationsCsv: csv.getViolations,
    getLitigationsCsv: csv.getLitigations,
    getBuildingsXml: xml.getBuildings,
    getComplaintsXml: xml.getComplaints,
    getOpenComplaintsXml: xml.getOpenComplaints,
    getRegistrationsXml: xml.getRegistrations,
  };
};

module.exports = {
  create,
};
