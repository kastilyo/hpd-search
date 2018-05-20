const { DateTime } = require('luxon');

const problemFromXml =
  problemData => ({
    id: problemData.children.ProblemID.value,
    unitType: problemData.children.UnitType.children.LongName.value,
    spaceType: problemData.children.SpaceType.children.LongName.value,
    type: problemData.children.Type.children.LongName.value,
    majorCategory: problemData.children.MajorCategory.children.LongName.value,
    minorCategory: problemData.children.MinorCategory.children.LongName.value,
    code: problemData.children.Code.children.LongName.value,
    status: problemData.children.Status.children.LongName.value,
    statusUpdatedAt: formatDate(problemData.children.StatusDate.value),
    statusDescription: problemData.children.StatusDescription.value
      ? problemData.children.StatusDescription.value.trim()
      : null,
  });

const fromXml =
  data =>
    ({
      id: data.children.ComplaintID.value,
      buildingId: data.children.BuildingID.value,
      receivedAt: formatDate(data.children.ReceivedDate.value),
      status: data.children.Status.children.LongName.value,
      statusUpdatedAt: formatDate(data.children.StatusDate.value),
      problems: data.children.Problems.children.Problem.map
        ? data.children.Problems.children.Problem.map(problemFromXml)
        : [problemFromXml(data.children.Problems.children.Problem)],
    });

const formatDate =
  inputDate =>
    DateTime.fromISO(inputDate).toISO();

module.exports = {
  fromXml,
};
