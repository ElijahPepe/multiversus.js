/* eslint-disable no-async-promise-executor */
const BaseManager = require('./BaseManager');
const { fetchData, handleData } = require('../util/Data.js');

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
			const data = await fetchData({
				url: `/ssc/invoke/get_battlepass?AccountID=${id}`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}
}

module.exports = BattlepassManager;