/* eslint-disable no-async-promise-executor */
const BaseManager = require('./BaseManager');
const { handleData } = require('../util/Data.js');
const Routes = require('../util/Routes');

/**
 * Manages API methods for leaderboards
 * @extends {BaseManager}
 */
class LeaderboardManager extends BaseManager {
	/**
	 * Types of leaderboards to use in a LeaderboardManager.
	 * - `1v1`
	 * - `2v2`
	 * @typedef {string} LeaderboardTypes
	 */

	/**
	 * Obtains the leaderboard from MultiVersus
	 * @param {LeaderboardTypes} type The type of leaderboard to fetch
	 * @returns {Promise<Object>}
	 */
	fetch(type) {
		return new Promise(async (resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			const data = await this.client.rest.get(Routes.leaderboard(type));
			handleData(data, resolve, reject);
		});
	}

	/**
	 * Obtains a character leaderboard from MultiVersus
	 * @param {LeaderboardTypes} type The type of leaderboard to fetch
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
			const data = await this.client.rest.get(Routes.leaderboardCharacter(type, character));
			handleData(data, resolve, reject);
		});
	}

	/**
	 * Obtains a user's score and rank from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @param {LeaderboardTypes} type The type of leaderboard to fetch
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
			const data = await this.client.rest.get(Routes.leaderboardProfile(id, type));
			handleData(data, resolve, reject);
		});
	}

	/**
	 * Obtains a user's score and rank in a character leaderboard from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @param {LeaderboardTypes} type The type of leaderboard to fetch
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
			const data = await this.client.rest.get(Routes.leaderboardProfileCharacter(id, type, character));
			handleData(data, resolve, reject);
		});
	}
}

module.exports = LeaderboardManager;
