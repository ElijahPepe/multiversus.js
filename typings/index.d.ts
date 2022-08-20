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
 * Possible values for a leaderboard
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

	/**
	 * The number of points the user has
	 * @type {?boolean}
	 * @readonly
	 */
	points: boolean | null;

	data: {
		/**
		 * Whether the user is a child or not
		 * @type {boolean}
		 * @readonly
		 */
		IsChildAccount: boolean;

		/**
		 * The perk preferences of the user
		 * @type {PerkPreferences}
		 * @readonly
		 */
		PerkPreferences: PerkPreferences;

		/**
		 * Whether the 2v2 prompt is shown
		 * @type {number}
		 * @readonly
		 */
		'2v2_prompt_shown': number;
	};

	/**
	 * The user's server data
	 * @type {ServerData}
	 * @readonly
	 */
	server_data: ServerData;

	/**
	 * The user's match data, by mode
	 * @type {ModeStats}
	 * @readonly
	 */
	matches: ModeStats;

	/**
	 * The user's cross match results
	 * @type {Object}
	 * @readonly
	 */
	cross_match_results: Object;

	/**
	 * The user's notifications
	 * @type {Object}
	 * @readonly
	 */
	notifications: Object;

	/**
	 * Aggregates for the user
	 * @type {Object}
	 * @readonly
	 */
	aggregates: Object;

	/**
	 * Calculations for the user
	 * @type {Object}
	 * @readonly
	 */
	calculations: Object;

	/**
	 * An array of files
	 * @type {Object[]}
	 * @readonly
	 */
	files: Object[];

	/**
	 * An array of user segments
	 * @type {string[]}
	 * @readonly
	 */
	user_segments: string[];

	/**
	 * The user's random distribution
	 * @type {number}
	 * @readonly
	 */
	random_distribution: number;

	/**
	 * The user's stats in 2v2s
	 * @type {ModeData}
	 * @readonly
	 */
	'2v2': ModeData;

	/**
	 * The user's stats in ffa matches
	 * @type {ModeData}
	 * @readonly
	 */
	ffa: ModeData;

	/**
	 * The user's stats in 1v1s
	 * @type {ModeData}
	 * @readonly
	 */
	'1v1': ModeData;
};

/**
 * API response for searches
 */
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

/**
 * API response for search results
 */
export type SearchResult = {
	/**
	 * The score of the result
	 * @type {?number}
	 * @readonly
	 */
	score: number | null;

	/**
	 * The result
	 * @type {ProfileResponse}
	 * @readonly
	 */
	result: ProfileResponse;
};

/**
 * API response for perk preferences
 */
export type PerkPreferences = {
	/**
	 * Object of characters
	 * @type {Object}
	 * @readonly
	 */
	Characters: Object;
};

/**
 * API response for a user's server data
 */
export type ServerData = {
	/**
	 * Debug flag specifying if the user has everything unlocked
	 * @type {number}
	 * @readonly
	 */
	debug_all_unlocked: number;

	/**
	 * The user's level
	 * @type {number}
	 * @readonly
	 */
	Level: number;

	/**
	 * The user's current XP
	 * @type {number}
	 * @readonly
	 */
	CurrentXP: number;

	/**
	 * The user's loss streak
	 * @type {number}
	 * @readonly
	 */
	loss_streak: number;

	/**
	 * The user's battle pass ID
	 * @type {string}
	 * @readonly
	 */
	BattlepassID: string;

	/**
	 * An object containing stat trackers
	 * @type {StatTrackers}
	 * @readonly
	 */
	stat_trackers: StatTrackers;

	/**
	 * The user's unclaimed character mastery rewards
	 * @type {Object}
	 * @readonly
	 */
	UnclaimedCharacterMasteryRewards: Object;

	/**
	 * The user's lifetime damage
	 * @type {number}
	 * @readonly
	 */
	lifetime_damage: number;

	/**
	 * The user's lifetime ringouts
	 * @type {number}
	 * @readonly
	 */
	lifetime_ringouts: number;

	/**
	 * The number of matches a user has played
	 * @type {number}
	 * @readonly
	 */
	matches_played: number;

	/**
	 * The number of sets a user has played
	 * @type {number}
	 * @readonly
	 */
	sets_played: number;

	/**
	 * An objects of the user's owned perks by character
	 * @type {Object}
	 * @readonly
	 */
	OwnedPerks: Object;

	/**
	 * Data on a users's performance in 1v1s, for use in matchmaking
	 * @type {Object}
	 * @readonly
	 */
	'1v1shuffle': Object;

	/**
	 * Data on the user's characters
	 * @type {Object}
	 * @readonly
	 */
	Characters: Object;

	/**
	 * Data on a users's performance in 2v2s, for use in matchmaking
	 * @type {Object}
	 * @readonly
	 */
	'2v2shuffle': Object;

	/**
	 * An array of IDs the user recently toasted
	 * @type {string[]|[]}
	 * @readonly
	 */
	RecentlyToasted: string[] | [];
};

/**
 * API response for a user's tracked stats
 */
export type StatTrackers = {
	/**
	 * The user's highest damage dealt
	 * @type {number}
	 * @readonly
	 */
	HighestDamageDealt: number;

	/**
	 * The user's total attacks dodged
	 * @type {number}
	 * @readonly
	 */
	TotalAttacksDodged: number;

	/**
	 * The user's total assists
	 * @type {number}
	 * @readonly
	 */
	TotalAssists: number;

	/**
	 * The user's total number of times they've been a ringout leader
	 * @type {number}
	 * @readonly
	 */
	TotalRingoutLeader: number;

	/**
	 * The user's total ringouts
	 * @type {number}
	 * @readonly
	 */
	TotalRingouts: number;

	/**
	 * The user's total wins
	 * @type {number}
	 * @readonly
	 */
	TotalWins: number;

	/**
	 * The user's character wins
	 * @type {Object}
	 * @readonly
	 */
	character_wins: object;

	/**
	 * The user's total double ringouts
	 * @type {number}
	 * @readonly
	 */
	TotalDoubleRingouts: number;
};

export type ModeStats = {
	/**
	 * The user's stats for 2v2s
	 * @type {ModeData}
	 * @readonly
	 */
	'2v2': ModeData;

	/**
	 * The user's stats for ffa matches
	 * @type {ModeData}
	 * @readonly
	 */
	ffa: ModeData;

	/**
	 * The user's stats for 1v1s
	 * @type {ModeData}
	 * @readonly
	 */
	'1v1': ModeData;
};

export type ModeData = {
	/**
	 * The number of losses the user has in this mode
	 * @type {number}
	 * @readonly
	 */
	loss: number;

	/**
	 * The win streak the user has in this mode
	 * @type {number}
	 * @readonly
	 */
	win_streak: number;

	/**
	 * The longest win streak the user has had in this mode
	 * @type {number}
	 * @readonly
	 */
	longest_win_streak: number;

	/**
	 * The number of wins the user has in this mode
	 * @type {number}
	 * @readonly
	 */
	win: number;
};
