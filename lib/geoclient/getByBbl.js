module.exports =
  client => ({ borough, block, lot }) =>
    client.get('bbl', { borough, block, lot });
