/* eslint-disable no-async-promise-executor */
const BaseManager = require('./BaseManager');
const { handleData } = require('../util/Data.js');
const Routes = require('../util/Routes');

/**
 * Manages API methods for battlepasses
 * @extends {BaseManager}
 */
class BattlepassManager extends BaseManager {
	/**
	 * Obtains battle pass info from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @returns {Promise<Object>}
	 */
	fetch(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A user ID must be provided.');
			}
			const data = await this.client.rest.get(Routes.battlepass(id));
			handleData(data, resolve, reject);
		});
	}
}

module.exports = BattlepassManager;
