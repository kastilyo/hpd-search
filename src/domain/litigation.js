const { DateTime } = require('luxon');

const INPUT_DATE_FORMAT = 'MM/dd/yyyy hh:mm:ss';

const formatDate =
  inputDate =>
    DateTime
      .fromFormat(inputDate, INPUT_DATE_FORMAT)
      .toISO();

const fromSoda =
  data =>
    ({
      id: data.litigationid,
      buildingId: data.buildingid,
      type: data.casetype,
      openedAt: data.caseopendate ? formatDate(data.caseopendate) : null,
      status: data.status,
      openJudgement: data.casejudgement === 'YES',
      harassmentFinding: data.findingofharrasment || null,
      harassmentFindingAt: data.findingdate ? formatDate(data.findingdate) : null,
      penalty: data.penalty ? 0.0 : parseFloat(data.penalty),
      respondent: data.respondent || null,
    });

module.exports = {
  fromSoda,
};
