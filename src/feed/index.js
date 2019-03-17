/**
 * Rx Observables of domain entities parsed from HPD streaming files thus the dependency of the HPD
 * client
 */
const create =
  hpd => ({
    building$: () => require('./building$')(hpd),
    registration$: () => require('./registration$')(hpd),
    violation$: () => require('./violation$')(hpd),
    complaint$:  () => require('./complaint$')(hpd),
    litigation$:  () => require('./litigation$')(hpd),
  });

module.exports = {
  create,
};
