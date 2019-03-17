const Xml = require('./xml')
  , Csv = require('./csv');

/**
 * This creates a low-ish level client for HPD data which is available from XML or CSV data.
 * XML data is scraped from the HPD website while CSV data is from NYC OpenData which requires a
 * SODA app token. Data from either source are exposed as streams of parsed objects.
 */
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
