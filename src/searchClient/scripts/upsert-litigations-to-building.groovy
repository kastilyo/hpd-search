if (ctx._source.litigations == null) {
  ctx._source.litigations = [];
}

for (int i = 0; i < params.litigations.size(); i++) {
  if (!ctx._source.litigations.contains(params.litigations[i])) {
    ctx._source.litigations.add(params.litigations[i]);
  }
}
