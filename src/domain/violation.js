const { DateTime } = require('luxon');

const fromSoda =
  data =>
    ({
      id: data.violationid,
      buildingId: data.buildingid,
      status: data.currentstatus,
      statusUpdatedAt: data.currentstatusdate,
      apartment: data.apartment || null,
      story: data.story || null,
      class: data.class,
      inspectedAt: data.inspectiondate ? formatDate(data.inspectiondate) : null,
      approvedAt: data.approveddate ? formatDate(data.approveddate) : null,
      originalCertifyByAt: data.originalcertifybydate ? formatDate(data.originalcertifybydate) : null,
      originalCorrectByAt: data.originalcorrectbydate ? formatDate(data.originalcorrectbydate) : null,
      certifyByAt: data.newcertifybydate ? formatDate(data.newcertifybydate) : data.originalcertifybydate ? formatDate(data.originalcertifybydate) : null,
      correctByAt: data.newcorrectbydate ? formatDate(data.newcorrectbydate) : data.originalcorrectbydate ? formatDate(data.originalcorrectbydate) : null,
      certifiedAt: data.certifieddate ? formatDate(data.certifieddate) : null,
      orderNumber: data.ordernumber,
      noticeOfViolation: {
        id: data.novid,
        type: data.novtype || null,
        issuedAt: data.novissueddate ? formatDate(data.novissueddate) : null,
        description: data.novdescription,
      },
    });

const formatDate =
  inputDate =>
    DateTime.fromISO(inputDate).toISO();

module.exports = {
  fromSoda,
};
