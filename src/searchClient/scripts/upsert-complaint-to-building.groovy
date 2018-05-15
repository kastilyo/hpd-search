if (ctx._source.complaints == null) {
  ctx._source.complaints = [];
}

if (!ctx._source.complaints.contains(params.complaint)) {
  ctx._source.complaints.add(params.complaint);
}
