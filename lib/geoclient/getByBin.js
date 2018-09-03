module.exports =
  client => ({ bin }) =>
    client.get('bin', { bin });
