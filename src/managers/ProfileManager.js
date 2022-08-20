/* eslint-disable no-async-promise-executor */
const BaseManager = require('./BaseManager');
const { fetchData, handleData } = require('../util/Data.js');

/**
 * Manages API methods for profiles
 * @extends {BaseManager}
 */
class ProfileManager extends BaseManager {
	/**
	 * Searches for a user from Multiversus
	 * @param {string} username The username to search for
	 * @param {limit} limit The number of entries
	 * @param {?string} cursor The cursor
	 * @returns {Promise<SearchResponse>}
	 */
	search(username, limit = 25, cursor = null) {
		return new Promise(async (resolve, reject) => {
			if (!username) {
				throw new Error('A query must be provided.');
			}
			const data = await fetchData({
				url: `/profiles/search_queries/get-by-username/run?username=${username}&limit=${limit}${
					cursor ? `&cursor=${cursor}` : ''
				}`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}

	/**
	 * Obtains a user from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @returns {Promise<ProfileResponse>}
	 */
	fetch(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A user ID must be provided.');
			}
			const data = await fetchData({
				url: `/profiles/${id}`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}
}

module.exports = ProfileManager;
