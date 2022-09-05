const BaseManager = require('./BaseManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for clans
 * @extends {BaseManager}
 */
class ClanManager extends BaseManager {
	/**
	 * Obtains clan info from MultiVersus.
	 * This is a planned feature and as such no data is returned.
	 * @param {string} id The ID of the user to fetch
	 * @param {number?} page The page
	 * @param {number?} count The number of entries
	 * @returns {Promise<any>}
	 */
	async fetch(id, page = 1, count = 25) {
		if (!id) {
			throw new Error('A user ID must be provided.');
		}
		const data = await this.client.rest.get(Routes.clan(id, page, count));
		return data;
	}
}

module.exports = ClanManager;
