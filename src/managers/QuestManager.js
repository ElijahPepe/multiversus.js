const BaseManager = require('./BaseManager');
const Routes = require('../util/Routes');

/**
 * Manages API methods for quests
 * @extends {BaseManager}
 */
class QuestManager extends BaseManager {
	/**
	 * Obtains quest info from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @returns {Promise<any>}
	 */
	async fetch(id) {
		if (!id) {
			throw new Error('A user ID must be provided.');
		}
		const data = await this.client.rest.get(Routes.quest(id));
		return data;
	}
}

module.exports = QuestManager;
