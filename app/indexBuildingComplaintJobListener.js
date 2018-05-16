/* eslint-disable no-console */
const IndexBuildingNestedEntityJobListener = require('./indexBuildingNestedEntityJobListener');

IndexBuildingNestedEntityJobListener.create({
  type: IndexBuildingNestedEntityJobListener.TYPES.COMPLAINT,
  buffer: {
    size: 20000,
    timeoutMs: 10000,
  }
});
