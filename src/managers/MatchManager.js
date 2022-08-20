/* eslint-disable no-async-promise-executor */
const BaseManager = require('./BaseManager');
const { fetchData, handleData } = require('../util/Data.js');

/**
 * Manages API methods for matches
 * @extends {BaseManager}
 */
class MatchManager extends BaseManager {
	/**
	 * Obtains match info from MultiVersus
	 * @param {string} id The ID of the natch to fetch
	 * @returns {Promise<Object>}
	 */
	fetch(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A match ID must be provided.');
			}
			const data = await fetchData({
				url: `/matches/${id}`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}

	/**
	 * Obtains all matches from MultiVersus
	 * @param {string} id The ID of the natch to fetch
	 * @param {number} page The page
	 * @returns {Promise<Object>}
	 */
	fetchAll(id, page = 1) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = await fetchData({
				url: `/matches/all/${id}?page=${page}`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}
}

module.exports = MatchManager;