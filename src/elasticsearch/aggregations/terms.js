/**
 * A multi-bucket value source based aggregation where buckets are dynamically built - one per
 * unique value.
 */

module.exports = field => ({
  terms: { field },
});
