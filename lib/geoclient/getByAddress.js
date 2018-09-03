module.exports =
  client => ({ houseNumber, street, borough = null, zip = null }) =>
    client.get('address', {
      houseNumber,
      street,
      ...borough !== null ? { borough } : {},
      ...zip !== null ? { zip } : {}
    });
