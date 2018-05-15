const fromXml =
  data =>
    ({
      id: data.children.BuildingID.value,
      borough: data.children.Boro.children.LongName.value,
      houseNumber: data.children.HouseNumber.value,
      streetName: data.children.StreetName.value,
      postalCode: data.children.Zip.value,
      block: data.children.Block.value,
      lot: data.children.Lot.value,
      bin: data.children.BIN.value,
      communityBoard: data.children.CommunityBoard.value,
      censusTract: data.children.CensusTract.value,
      management: data.children.ManagementProgram.value,
      class: data.children.DoBBuildingClass.children ? data.children.DoBBuildingClass.children.LongName.value : null,
      storyCount: parseInt(data.children.LegalStories.value),
      classAUnitCount: parseInt(data.children.LegalClassA.value),
      classBUnitCount: parseInt(data.children.LegalClassB.value),
      status: data.children.RecordStatus.children.LongName.value,
    });

module.exports = {
  fromXml,
};
