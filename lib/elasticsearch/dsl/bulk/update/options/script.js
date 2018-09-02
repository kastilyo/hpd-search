module.exports = ({id = null, source = null, lang = null, params = null}) => ({
  script: {
    ...id ? { id } : {},
    ...source ? { source } : {},
    ...lang ? { lang } : {},
    ...params ? { params } : {},
  },
});
