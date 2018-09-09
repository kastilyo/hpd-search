if (ctx._source.violations == null) {
  ctx._source.violations = [];
}

for (int i = 0; i < params.violations.size(); i++) {
  if (!ctx._source.violations.contains(params.violations[i])) {
    ctx._source.violations.add(params.violations[i]);
  }
}
