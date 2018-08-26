/**
 * A query that matches documents matching boolean combinations of other queries. It is built using
 * one or more boolean clauses, each clause with a typed occurrence.
 */

const occurrence = require('./occurrence');

/**
 * The occurrence types are:
 */
const [
  /**
   * `must`
   * The clause (query) must appear in matching documents and will contribute to the score.
  */
  must,
  /**
   * `should`
   * The clause (query) should appear in the matching document. If the `bool` query is in a query
   * context and has a `must` or `filter` clause then a document will match the `bool` query even if
   * none of the `should` queries match. In this case these clauses are only used to influence the
   * score. If the `bool` query is a filter context or has neither `must` or `filter` then at least
   * one of the `should` queries must match a document for it to match the `bool` query. This
   * behavior may be explicitly controlled by settings the `minimum_should_match` parameter.
  */
  should,
  /**
   * `must_not`
   * The clause (query) must not appear in the matching documents. Clauses are executed in filter
   * context meaning that scoring is ignored and clauses are considered for caching. Because scoring
   * is ignored, a score of 0 for all documents is returned.
   */
  mustNot,
  /**
   * `filter`
   * The clause (query) must appear in matching documents. However unlike must the score of the
   * query will be ignored. Filter clauses are executed in filter context, meaning that scoring is
   * ignored and clauses are considered for caching.
   */
  filter
] =
  [
    'must',
    'should',
    'must_not',
    'filter',
  ].map(occurrence);


const bool = body => ({
  ...(body.hasOwnProperty('minimumShouldMatch')
    ? { minimum_should_match : body.minimumShouldMatch }
    : {}),
  ...body.hasOwnProperty('boost') ? { boost : body.boost } : {},
  ...body.hasOwnProperty('must') ? must(body.must) : {},
  ...body.hasOwnProperty('mustNot') ? mustNot(body.mustNot): {},
  ...body.hasOwnProperty('should') ? should(body.should): {},
  ...body.hasOwnProperty('filter') ? filter(body.filter): {},
});

module.exports = Object.assign(bool, {
  must,
  mustNot,
  should,
  filter,
});
