const contactFromXml =
  contactData => ({
    id: contactData.children.RegistrationContactID.value,
    type: contactData.children.Type.value,
    description: contactData.children.ContactDescription.value,
    corporationName: contactData.children.CorporationName.value || null,
    title: contactData.children.Title.value || null,
    firstName: contactData.children.FirstName.value || null,
    lastName: contactData.children.LastName.value || null,
    business: {
      houseNumber: contactData.children.BusinessHouseNumber.value,
      streetName: contactData.children.BusinessStreetName.value,
      apartment: contactData.children.BusinessApartment.value,
      city: contactData.children.BusinessCity.value,
      state: contactData.children.BusinessState.value,
      postalCode: contactData.children.BusinessZip.value,
    },
  });

const fromXml =
  data =>
    ({
      id: data.children.RegistrationID.value,
      buildingId: data.children.BuildingID.value,
      lastRegistrationAt: data.children.LastRegistrationDate.value,
      expiresAt: data.children.RegistrationEndDate.value,
      contacts: data.children.Contacts.children
        ? data.children.Contacts.children.RegistrationContact.map
          ? data.children.Contacts.children.RegistrationContact.map(contactFromXml)
          : [contactFromXml(data.children.Contacts.children.RegistrationContact)]
        : [],
    });

module.exports = {
  fromXml,
};
