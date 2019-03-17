/**
 * Functions that relate to hydrating domain entities. They are coupled to a) the possible data
 * sources (XML and CSV) and b) the libraries used to stream parse them (xml-flow, csv-streamify)
 */
module.exports = {
  Building: require('./building'),
  Complaint: require('./complaint'),
  Registration: require('./registration'),
  Violation: require('./violation'),
  Litigation: require('./litigation'),
};
