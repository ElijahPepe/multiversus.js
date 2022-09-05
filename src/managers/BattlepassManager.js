const BaseManager = require('./BaseManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for battlepasses
 * @extends {BaseManager}
 */
class BattlepassManager extends BaseManager {
	/**
	 * Obtains battle pass info from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @returns {Promise<any>}
	 */
	async fetch(id) {
		if (!id) {
			throw new Error('A user ID must be provided.');
		}
		const data = await this.client.rest.get(Routes.battlepass(id));
		return data;
	}
}

module.exports = BattlepassManager;
