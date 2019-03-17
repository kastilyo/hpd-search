/**
 * Functions that relate to hydrating domain entities. They are coupled to a) the possible data
 * sources (XML and CSV) and b) the libraries used to stream parse them (xml-flow, csv-streamify)
 */

const TYPE_BUILDING = 'building';
const TYPE_VIOLATION = 'violation';
const TYPE_REGISTRATION = 'registration';
const TYPE_LITIGATION = 'litigation';
const TYPE_COMPLAINT = 'complaint';

const TYPES = [
  TYPE_BUILDING,
  TYPE_VIOLATION,
  TYPE_REGISTRATION,
  TYPE_LITIGATION,
  TYPE_COMPLAINT,
];

const CONSTANTS = {
  TYPES,
  TYPE_BUILDING,
  TYPE_VIOLATION,
  TYPE_REGISTRATION,
  TYPE_LITIGATION,
  TYPE_COMPLAINT,
};

module.exports = {
  ...CONSTANTS,
  Building: require('./building'),
  Complaint: require('./complaint'),
  Registration: require('./registration'),
  Violation: require('./violation'),
  Litigation: require('./litigation'),
};
