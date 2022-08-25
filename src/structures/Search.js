const Base = require('./Base');

/**
 * API response for searches
 * @extends {Base}
 */
class Search extends Base {
	constructor(client, data) {
		super(client);

		/**
	 	 * The cursor of the search
	 	 * @type {string}
	 	 */
		this.cursor = data.cursor;

		/**
		 * The start of the search
		 * @type {number}
		 */
    this.start = data.start;

    /**
		 * The number of results returned by this query
		 * @type {number}
		 */
    this.count = data.count;

		/**
		 * The total number of results
		 * @type {number}
		 */
		this.total = data.total;

		/**
		 * The results of this query
		 * @type {SearchResult[]|[]}
		 */
		this.results = data.results;
	}
}

/**
 * @typedef {Object} SearchResult
 * @property {?number} title The score of the result
 * @property {Object} result The result
 */

module.exports = Search;
