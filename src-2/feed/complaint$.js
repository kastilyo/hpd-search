const Rx = require('rxjs')
  , Entities = require('./../entities')
  , xmlEntity$ = require('./xmlEntity$');

module.exports =
  hpd =>
    Rx.merge(
      xmlEntity$(
        'Complaint',
        hpd.getOpenComplaintsXml,
        Entities.Complaint.fromXml
      ),
      xmlEntity$(
        'Complaint',
        hpd.getComplaintsXml,
        Entities.Complaint.fromXml
      )
    );

