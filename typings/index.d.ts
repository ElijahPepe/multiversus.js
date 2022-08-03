/**
 * The base client for interacting with the MultiVersus API.
 */
export class Client {
	/**
	 * Options for the client
	 * @param {?string} accessToken Access token of the account to log in with
	 */
	constructor(accessToken?: string);

	/**
	 * Creates an access token, allowing you to access the MultiVersus API.
	 * @param {string} username Username of the account to log in with
	 * @param {string} password Password of the account to log in with
	 * @returns {Promise<any>}
	 * @example
	 * client.login('username', 'password');
	 */
	login(username: string, password: string): Promise<any>;

	/**
	 * Returns info about the current client, including account info, notifications, and WB network status.
	 * @param {?string} steamTicket The Steam encrypted application ticket of the account, converted to hex.
	 * @returns {Promise<any>}
	 * @example
	 * client.info();
	 */
	info(steamTicket?: string): Promise<any>;

	/**
	 * Search for users from a username.
	 * @param {string} username Username to search for
	 * @param {number} [limit=25] Limit of users to return.
	 * @returns {Promise<searchResponse>}
	 * @example
	 * client.searchByUsername('ElijahPepe', 10);
	 */
	searchByUsername(username: string, limit?: number): Promise<any>;

	/**
	 * Fetch a match from an ID.
	 * @param {string} id The ID of the match to fetch
	 */
	getMatch(id: string): Promise<any>;

	/**
	 * Fetch a profile from an ID.
	 * @param {string} id The ID of the profile to fetch
	 */
	getProfile(id: string): Promise<ProfileResponse>;

	/**
	 * Fetch the leaderboard of a user.
	 * @param {string} id The ID of the user.
	 * @param {leaderboardType} type The leaderboard type to fetch.
	 */
	getProfileLeaderboard(id: string, type: LeaderboardType): Promise<any>;

	/**
	 * Fetch the leaderboard of a user with a character.
	 * @param {string} id The ID of the user.
	 * @param {leaderboardType} type The leaderboard type to fetch.
	 * @param {string} character The character to fetch.
	 */
	getProfileLeaderboardForCharacter(id: string, type: LeaderboardType, character: string): Promise<any>;

	/**
	 * Fetch the global leaderboard.
	 * @param {leaderboardType} type The type of leaderboard to fetch.
	 */
	getLeaderboard(type: LeaderboardType): Promise<any>;

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

/**
 * Represents character data
 */
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
	static RickSanchez: {
		id: string;
	};
}

/**
 * Types in a leaderboard
 */
export type LeaderboardType = '2v2' | '1v1';

/**
 * API response for requesting a profile
 */
export type ProfileResponse = {
	/**
	 * The internal ID of the profile
	 * @type {string}
	 * @readonly
	 */
	id: string;
	/**
	 * The time the profile was last updated at
	 * @type {string}
	 * @readonly
	 */
	updated_at: string;
	/**
	 * The account ID of the profile
	 * @type {string}
	 * @readonly
	 */
	account_id: string;
	/**
	 * The time the profile was created at
	 * @type {string}
	 * @readonly
	 */
	created_at: string;
	/**
	 * The time the user last logged in at
	 * @type {string}
	 * @readonly
	 */
	last_login: string;
	data: {
		/**
		 * Whether the user is a child or not
		 * @type {boolean}
		 * @readonly
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

export type SearchResponse = {
	/**
	 * The cursor of the search
	 * @type {string}
	 * @readonly
	 */
	cursor: string;
	/**
	 * The start of the search
	 * @type {number}
	 * @readonly
	 */
	start: number;
	/**
	 * The number of results returned by this query
	 * @type {number}
	 * @readonly
	 */
	count: number;
	/**
	 * The total number of results
	 * @type {number}
	 * @readonly
	 */
	total: number;
	/**
	 * The results of this query
	 * @type {SearchResult[]|[]}
	 * @readonly
	 */
	results: SearchResult[] | [];
};

export type SearchResult = {
	/**
	 * The score of the result
	 * @type {null|number}
	 * @readonly
	 */
	score: null | number;
	/**
	 * The result
	 * @type {ProfileResponse}
	 * @readonly
	 */
	result: ProfileResponse;
};
