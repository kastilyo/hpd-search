/* eslint-disable no-console */
const IndexBuildingNestedEntityJobListener = require('./indexBuildingNestedEntityJobListener');

IndexBuildingNestedEntityJobListener.create({
  type: IndexBuildingNestedEntityJobListener.TYPES.VIOLATION,
  buffer: {
    size: 20000,
    timeoutMs: 10000,
  }
});
