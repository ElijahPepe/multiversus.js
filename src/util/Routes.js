/* eslint-disable max-len */
const Routes = {
		/**
	 		* Route for:
	 		* - POST   `/access`
	 		* - DELETE `/access`
	 		*
	 		* @returns {string}
	 		*/
		access() {
			return `/access`;
		},

		/**
	 		* Route for:
	 		* - GET   `/ssc/invoke/get_battlepass?AccountID=${id}`
	 		*
		 	* @param {string} id The user ID
	 		* @returns {string}
	 		*/
		battlepass(id) {
			return `/ssc/invoke/get_battlepass?AccountID=${id}`;
		},

		/**
	 		* Route for:
	 		* - GET   `/clans/pfg-clan/for/${id}?count=${count}&page=${page}`
	 		*
		 	* @param {string} id The user ID
		 	* @param {number?} page The page
		 	* @param {number?} count The count
	 		* @returns {string}
	 		*/
		clan(id, page = 1, count = 25) {
			return `/clans/pfg-clan/for/${id}?count=${count}&page=${page}`;
		},

		/**
	 		* Route for:
	 		* - GET   `/leaderboards/${type}/show`
	 		*
	 		* @param {LeaderboardTypes} type The type of leaderboard to fetch
			* @param {number?} page The page
	 		* @returns {string}
	 		*/
		leaderboard(type, page) {
			return `/leaderboards/${type}/show?page=${page}`;
		},
	
		/**
			* Route for:
			* - GET   `/leaderboards/${character}_${type}/show`
			*
			* @param {LeaderboardTypes} type The type of leaderboard to fetch
			* @param {string} character The character leaderboard to fetch
			* @param {number?} page The page
			* @returns {string}
			*/
		leaderboardCharacter(type, character, page) {
			return `/leaderboards/${character}_${type}/show?page=${page}`;
		},

		/**
	 		* Route for:
	 		* - GET   `/leaderboards/${type}/score-and-rank/${id}`
	 		*
	 		* @param {string} id The ID of the user to fetch
	 		* @param {LeaderboardTypes} type The type of leaderboard to fetch
	 		* @returns {string}
	 		*/
		leaderboardProfile(id, type) {
			return `/leaderboards/${type}/score-and-rank/${id}`;
		},

		/**
	 		* Route for:
	 		* - GET   `/leaderboards/${character}_${type}/score-and-rank/${id}`
	 		*
	 		* @param {string} id The ID of the user to fetch
	 		* @param {LeaderboardTypes} type The type of leaderboard to fetch
	 		* @param {string} character The character leaderboard to fetch
	 		* @returns {string}
	 		*/
		leaderboardProfileCharacter(id, type, character) {
			return `/leaderboards/${character}_${type}/score-and-rank/${id}`;
		},

		/**
	 		* Route for:
	 		* - GET   `/matches/${id}`
	 		*
	 		* @param {string} id The match ID
	 		* @returns {string}
	 		*/
		match(id) {
			return `/matches/${id}`;
		},

		/**
	 		* Route for:
	 		* - GET   `/matches/all/${id}?page=${page}`
	 		*
	 		* @param {string} id The accountID of the user
	 		* @param {number?} page The page
	 		* @returns {string}
	 		*/
		matchAll(id, page = 1) {
			return `/matches/all/${id}?page=${page}`;
		},

		/**
	 * Route for:
	 * - GET   `/profiles/${id}`
	 *
	 * @param {string} id The user ID
	 * @returns {string}
	 */
		profile(id) {
			return `/profiles/${id}`;
		},

		/**
	 * Route for:
	 * - GET   `/profiles/search_queries/get-by-username/run?username=${username}&limit=${limit}&cursor=${cursor}`
	 *
	 * @param {string} username The username to search for
	 * @param {limit?} limit The number of entries
	 * @param {string?} cursor The cursor
	 * @returns {string}
	 */
		profileSearch(username, limit = 25, cursor = null) {
			return `/profiles/search_queries/get-by-username/run?username=${username}&limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`;
		},

		/**
	 * Route for:
	 * - GET   `/accounts/${id}`
	 *
	 * @param {string} id The user ID
	 * @returns {string}
	 */
		user(id) {
			return `/accounts/${id}`;
		},

		/**
	 * Route for:
	 * - GET   `/ssc/invoke/get_quests?AccountID=${id}`
	 *
	 * @param {string} id The ID of the user to fetch
	 * @returns {string}
	 */
		quest(id) {
			return `/ssc/invoke/get_quests?AccountID=${id}`;
		},
};

module.exports = Routes;
