const Entities = require('./../entities')
  , xmlEntity$ = require('./xmlEntity$');

module.exports =
  hpd =>
    xmlEntity$(
      'Registration',
      hpd.getRegistrationsXml,
      Entities.Registration.fromXml
    );
