if (ctx._source.complaints == null) {
  ctx._source.complaints = [];
}

for (int i = 0; i < params.complaints.size(); i++) {
  if (!ctx._source.complaints.contains(params.complaints[i])) {
    ctx._source.complaints.add(params.complaints[i]);
  }
}
