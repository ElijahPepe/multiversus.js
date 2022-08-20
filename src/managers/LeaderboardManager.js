/* eslint-disable no-async-promise-executor */
const BaseManager = require('./BaseManager');
const { fetchData, handleData } = require('../util/Data.js');

/**
 * Manages API methods for leaderboards
 * @extends {BaseManager}
 */
class LeaderboardManager extends BaseManager {
	/**
	 * Obtains the leaderboard from MultiVersus
	 * @param {LeaderboardType} type The type of leaderboard to fetch
	 * @returns {Promise<Object>}
	 */
	fetch(type) {
		return new Promise(async (resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			const data = await fetchData({
				url: `/leaderboards/${type}/show`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}

	/**
	 * Obtains a character leaderboard from MultiVersus
	 * @param {LeaderboardType} type The type of leaderboard to fetch
	 * @param {string} character The character leaderboard to fetch
	 * @returns {Promise<Object>}
	 */
	fetchCharacter(type, character) {
		return new Promise(async (resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			if (!character) {
				return reject(new Error('A character must be provided.'));
			}
			const data = await fetchData({
				url: `/leaderboards/${character}_${type}/show`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}

	/**
	 * Obtains a user's score and rank from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @param {LeaderboardType} type The type of leaderboard to fetch
	 * @returns {Promise<Object>}
	 */
	fetchProfile(id, type) {
		return new Promise(async (resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = await fetchData({
				url: `/leaderboards/${type}/score-and-rank/${id}`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}

	/**
	 * Obtains a user's score and rank in a character leaderboard from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @param {LeaderboardType} type The type of leaderboard to fetch
	 * @param {string} character The character leaderboard to fetch
	 * @returns {Promise<Object>}
	 */
	fetchProfileCharacter(id, type, character) {
		return new Promise(async (resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			if (!character) {
				return reject(new Error('A character must be provided.'));
			}
			const data = await fetchData({
				url: `/leaderboards/${character}_${type}/score-and-rank/${id}`,
				accessToken: this.client.accessToken,
			});
			handleData(data, resolve, reject);
		});
	}
}

module.exports = LeaderboardManager;