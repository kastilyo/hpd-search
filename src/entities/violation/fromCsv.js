const { DateTime } = require('luxon');

module.exports =
  data => ({
    id: data.violationid,
    buildingId: data.buildingid,
    status: data.currentstatus,
    statusUpdatedAt: DateTime.fromISO(data.currentstatusdate),
    apartment: data.apartment || null,
    story: data.story || null,
    class: data.class,
    inspectedAt: data.inspectiondate ? DateTime.fromISO(data.inspectiondate) : null,
    approvedAt: data.approveddate ? DateTime.fromISO(data.approveddate) : null,
    originalCertifyByAt: data.originalcertifybydate ? DateTime.fromISO(data.originalcertifybydate) : null,
    originalCorrectByAt: data.originalcorrectbydate ? DateTime.fromISO(data.originalcorrectbydate) : null,
    certifyByAt: data.newcertifybydate ? DateTime.fromISO(data.newcertifybydate) : data.originalcertifybydate ? DateTime.fromISO(data.originalcertifybydate) : null,
    correctByAt: data.newcorrectbydate ? DateTime.fromISO(data.newcorrectbydate) : data.originalcorrectbydate ? DateTime.fromISO(data.originalcorrectbydate) : null,
    certifiedAt: data.certifieddate ? DateTime.fromISO(data.certifieddate) : null,
    orderNumber: data.ordernumber,
    noticeOfViolation: {
      id: data.novid,
      type: data.novtype || null,
      issuedAt: data.novissueddate ? DateTime.fromISO(data.novissueddate) : null,
      description: data.novdescription,
    },
  });
