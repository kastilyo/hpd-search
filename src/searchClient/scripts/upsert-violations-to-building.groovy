if (ctx._source.violations == null) {
  ctx._source.violations = [];
}

for (i = 0; i < params.violations.length; i++) {
  if (!ctx._source.violations.contains(params.violations[i])) {
    ctx._source.violations.add(params.violations[i]);
  }
}
