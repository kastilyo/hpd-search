const fromSoda =
  data =>
    ({
      id: data.violationid,
      buildingId: data.buildingid,
      status: data.currentstatus,
      statusUpdatedAt: data.currentstatusdate,
      apartment: data.apartment || null,
      story: data.story,
      class: data.class,
      inspectedAt: data.inspectiondate || null,
      approvedAt: data.approveddate || null,
      originalCertifyByAt: data.originalcertifybydate || null,
      originalCorrectByAt: data.originalcorrectbydate || null,
      certifyByAt: data.newcertifybydate || data.originalcertifybydate || null,
      correctByAt: data.newcorrectbydate || data.originalcorrectbydate || null,
      certifiedAt: data.certifieddate || null,
      orderNumber: data.ordernumber,
      noticeOfViolation: {
        id: data.novid,
        type: data.novtype || null,
        issuedAt: data.novissueddate || null,
        description: data.novdescription,
      },
    });

module.exports = {
  fromSoda,
};
