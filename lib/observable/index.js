/**
 * This exposes utility functions that will take node file stream factory functions (ie. functions
 * that return file streams) and returns Rx Observables of data parsed from those streams.
 */
module.exports = {
  fromCsv: require('./fromCsv'),
  fromXml: require('./fromXml'),
};
