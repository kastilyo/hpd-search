const fromSoda =
  data =>
    ({
      id: data.litigationid,
      buildingId: data.buildingid,
      type: data.casetype,
      openedAt: data.caseopendate || null,
      status: data.status,
      openJudgement: data.casejudgement === 'YES',
      harassmentFinding: data.findingofharrasment || null,
      harassmentFindingAt: data.findingdate || null,
      penalty: data.penalty ? 0.0 : parseFloat(data.penalty),
      respondent: data.respondent || null,
    });

module.exports = {
  fromSoda,
};
