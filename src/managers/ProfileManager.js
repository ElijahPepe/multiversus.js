const BaseManager = require('./BaseManager');
const Profile = require('../structures/Profile');
const Search = require('../structures/Search');
const Routes = require('../util/Routes');

/**
 * Manages API methods for profiles
 * @extends {BaseManager}
 */
class ProfileManager extends BaseManager {
	/**
	 * Searches for a user from Multiversus
	 * @param {string} username The username to search for
	 * @param {limit?} limit The number of entries
	 * @param {string?} cursor The cursor
	 * @returns {Promise<Search>}
	 */
	async search(username, limit = 25, cursor = null) {
		if (!username) {
			throw new Error('A query must be provided.');
		}
		const data = await this.client.rest.get(Routes.profileSearch(username, limit, cursor));
		return new Search(this.client, data);
	}

	/**
	 * Obtains a user from MultiVersus
	 * @param {string} id The ID of the user to fetch
	 * @returns {Promise<Profile>}
	 */
	async fetch(id) {
		if (!id) {
			throw new Error('A user ID must be provided.');
		}
		const data = await this.client.rest.get(Routes.profile(id));
		return new Profile(this.client, data);
	}
}

module.exports = ProfileManager;
