if (ctx._source.violations == null) {
  ctx._source.violations = [];
}
if (!ctx._source.violations.contains(params.violation)) {
  ctx._source.violations.add(params.violation);
}
