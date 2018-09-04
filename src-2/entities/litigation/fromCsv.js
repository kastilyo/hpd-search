const { DateTime } = require('luxon');

const DATE_FORMAT = 'MM/dd/yyyy hh:mm:ss';

module.exports =
  data => ({
    id: data.litigationid,
    buildingId: data.buildingid,
    type: data.casetype,
    openedAt: data.caseopendate ? DateTime.fromFormat(data.caseopendate, DATE_FORMAT) : null,
    status: data.casestatus,
    openJudgement: data.casejudgement === 'YES',
    harassmentFinding: data.findingofharrasment || null,
    harassmentFindingAt: data.findingdate ? DateTime.fromFormat(data.findingdate, DATE_FORMAT) : null,
    penalty: data.penalty ? parseFloat(data.penalty) : 0.0,
    respondent: data.respondent || null,
  });
