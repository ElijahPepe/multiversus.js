const BaseManager = require('./BaseManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for matches
 * @extends {BaseManager}
 */
class MatchManager extends BaseManager {
	/**
	 * Obtains match info from MultiVersus
	 * @param {string} id The ID of the match to fetch
	 * @returns {Promise<any>}
	 */
	async fetch(id) {
		if (!id) {
			throw new Error('A match ID must be provided.');
		}
		const data = await this.client.rest.get(Routes.match(id));
		return data;
	}

	/**
	 * Obtains all matches from MultiVersus
	 * @param {string} id The ID of the match to fetch
	 * @param {number?} page The page
	 * @returns {Promise<any>}
	 */
	async fetchAll(id, page = 1) {
		if (!id) {
			throw new Error('A user ID must be provided.');
		}
		const data = await this.client.rest.get(Routes.matchAll(id, page));
		return data;
	}
}

module.exports = MatchManager;
