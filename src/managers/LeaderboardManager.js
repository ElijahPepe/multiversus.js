const BaseManager = require('./BaseManager');
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
	 * @returns {Promise<any>}
	 */
	async fetch(type) {
		if (type !== '2v2' && type !== '1v1') {
			throw new Error('Leaderboard type must be 1v1 or 2v2.');
		}
		const data = await this.client.rest.get(Routes.leaderboard(type));
		return data;
	}

	/**
	 * Obtains a character leaderboard from MultiVersus
	 * @param {LeaderboardTypes} type The type of leaderboard to fetch
	 * @param {string} character The character leaderboard to fetch
	 * @returns {Promise<any>}
	 */
	async fetchCharacter(type, character) {
		if (type !== '2v2' && type !== '1v1') {
			throw new Error('Leaderboard type must be 1v1 or 2v2.');
		}
		if (!character) {
			throw new Error('A character must be provided.');
		}
		const data = await this.client.rest.get(Routes.leaderboardCharacter(type, character));
		return data;
	}

	/**
	 * Obtains a user's score and rank from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @param {LeaderboardTypes} type The type of leaderboard to fetch
	 * @returns {Promise<any>}
	 */
	async fetchProfile(id, type) {
		if (type !== '2v2' && type !== '1v1') {
			throw new Error('Leaderboard type must be 1v1 or 2v2.');
		}
		if (!id) {
			throw new Error('A user ID must be provided.');
		}
		const data = await this.client.rest.get(Routes.leaderboardProfile(id, type));
		return data;
	}

	/**
	 * Obtains a user's score and rank in a character leaderboard from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @param {LeaderboardTypes} type The type of leaderboard to fetch
	 * @param {string} character The character leaderboard to fetch
	 * @returns {Promise<any>}
	 */
	async fetchProfileCharacter(id, type, character) {
		if (type !== '2v2' && type !== '1v1') {
			throw new Error('Leaderboard type must be 1v1 or 2v2.');
		}
		if (!id) {
			throw new Error('A user ID must be provided.');
		}
		if (!character) {
			throw new Error('A character must be provided.');
		}
		const data = await this.client.rest.get(Routes.leaderboardProfileCharacter(id, type, character));
		return data;
	}
}

module.exports = LeaderboardManager;
