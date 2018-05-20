if (ctx._source.violations == null) {
  ctx._source.violations = [];
}

def existingViolationIds = [];
for (int i = 0; i < ctx._source.violations.length; i++) {
  existingViolationIds.add(ctx._source.violations.get(i).id);
}

for (int i = 0; i < params.violations.length; i++) {
  def newViolation = params.violations.get(i);
  int existingIdx = existingViolationIds.indexOf(newViolation.id);
  if (existingIdx > -1) {
    ctx._source.violations.set(existingIdx, newViolation);
  } else {
    ctx._source.violations.add(newViolation);
  }
}
