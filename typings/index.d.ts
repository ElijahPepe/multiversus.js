/**
 * Class representing the base client of MultiVersus.
 */
export class Client {
	/**
	 * Creates a client.
	 * @param {string} accessToken
	 * @param {string} clientId
	 */
	constructor(accessToken: string, clientId: string);

	/**
	 * Handles the API response if it is successful.
	 * @name resolveCallback
	 * @function
	 * @param {*} value The JSON object returned from the API.
	 */

	/**
	 * Handles the API response if it is unsuccessful.
	 * @name rejectCallback
	 * @function
	 * @param {*} error The error message returned from the API.
	 */

	/**
	 * Deconstruct an API response promise into two callback handlers.
	 * @param {apiResponse} data Response data of the API.
	 * @param {resolveCallback} resolve Callback for a successful API response.
	 * @param {rejectCallback} reject Callback for an unsuccessful API response.
	 */
	private handleData(data: apiResponse, resolve: resolveCallback, reject: rejectCallback): void;
	/**
	 * Search for users from a username.
	 * @param {string} username The username to search for.
	 * @param {number} [limit=25] Limit of usernames to return.
	 */
	searchByUsername(username: string, limit?: number): Promise<any>;
	/**
	 * Fetch a match from an ID.
	 * @param {string} id The ID of the match to fetch
	 */
	getMatch(id: string): Promise<any>;
	/**
	 * Fetch a profile from an ID.
	 * @param {string} id The ID of the profile to query.
	 */
	getProfile(id: string): Promise<profileResponse>;
	/**
	 * Fetch the leaderboard of a user.
	 * @param {string} id The ID of the user.
	 * @param {leaderboardType} type The leaderboard type to fetch.
	 */
	getProfileLeaderboard(id: string, type: leaderboardType): Promise<any>;
	/**
	 * Fetch the leaderboard of a user with a character.
	 * @param {string} id The ID of the user.
	 * @param {leaderboardType} type The leaderboard type to fetch.
	 * @param {string} character The character to fetch.
	 */
	getProfileLeaderboardForCharacter(id: string, type: leaderboardType, character: string): Promise<any>;
	/**
	 * Fetch the global leaderboard.
	 * @param {leaderboardType} type The type of leaderboard to fetch.
	 */
	getLeaderboard(type: leaderboardType): Promise<any>;
	/**
	 * Fetch a page of matches of a user.
	 * @param {string} id The ID of the user.
	 * @param {number} [page=1] The match page to fetch.
	 */
	getMatches(id: string, page?: number): Promise<any>;
	/**
	 * Fetch users Battlepass.
	 * @param {string} id The ID of the user.
	 */
	 getBattlepass(id: string): Promise<any>;
	 /**
	 * Fetch users quests.
	 * @param {string} id The ID of the user.
	 */
	 getQuests(id: string): Promise<any>;
	 /**
	 * Fetch users clan(s).
	 * @param {string} id The ID of the user.
	 * @param {number} [page=1] The match page to fetch.
	 * @param {number} [count=25] The count to fetch.
	 */
	  getClan(id: string, page?: number, count?: number): Promise<any>;
}
export class CharacterData {
	static Shaggy: {
		id: string;
	};
	static WonderWoman: {
		id: string;
	};
	static Batman: {
		id: string;
	};
	static Superman: {
		id: string;
	};
	static Taz: {
		id: string;
	};
	static IronGiant: {
		id: string;
	};
	static Garnet: {
		id: string;
	};
	static StevenUniverse: {
		id: string;
	};
	static Jake: {
		id: string;
	};
	static Reindog: {
		id: string;
	};
	static Finn: {
		id: string;
	};
	static Velma: {
		id: string;
	};
	static AryaStark: {
		id: string;
	};
	static BugsBunny: {
		id: string;
	};
	static HarleyQuinn: {
		id: string;
	};
	static TomAndJerry: {
		id: string;
	};
	static LeBronJames: {
		id: string;
	};
}
/**
 * Leaderboard type.
 */
export type leaderboardType = '2v2' | '1v1';
/**
 * API response for requesting a profile.
 */
export type profileResponse = {
	/**
	 * The ID of the profile.
	 */
	id: string;
	updated_at: string;
	/**
	 * The time that the account was created.
	 */
	created_at: string;
	/**
	 * The last time the user logged in.
	 */
	last_login: string;
	data: {
		/**
		 * Whether the user is a child or not.
		 */
		IsChildAccount: boolean;
	};
	server_data: {
		stat_trackers: {
			HighestDamageDealt: number;
			TotalAttacksDodged: number;
			TotalAssists: number;
			TotalRingoutLeader: number;
			TotalRingouts: number;
			TotalWins: number;
			TotalDoubleRingouts: number;
		};
		lifetime_damage: number;
		lifetime_ringouts: number;
		matches_played: number;
		sets_played: number;
	};
};
