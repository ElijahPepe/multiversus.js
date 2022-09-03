const BaseManager = require('./BaseManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for accounts
 * @extends {BaseManager}
 */
class AccountManager extends BaseManager {
	/**
	 * Obtains an account from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @returns {Promise<Object>}
	 */
	async fetch(id) {
		if (!id) {
			throw new Error('A user ID must be provided.');
		}
		const data = await this.client.rest.get(Routes.user(id));
		return data;
	}
}

module.exports = AccountManager;
