const Base = require('./Base');

/**
 * API response for requesting a profile
 * @extends {Base}
 */
class Profile extends Base {
	constructor(client, data) {
		super(client);

		/**
		 * The internal ID of the profile
		 * @type {string}
		 */
		this.id = data.id;

		/**
		 * The time the profile was last updated at
		 * @type {string}
		 */
		this.updated_at = data.updated_at;

		/**
		 * The account ID of the profile
		 * @type {string}
		 */
		this.account_id = data.account_id;

		/**
		 * The time the profile was created at
		 * @type {string}
		 */
		this.created_at = data.created_at;

		/**
		 * The time the profile last logged in at
		 * @type {string}
		 */
		this.last_login = data.last_login;

		/**
		 * The number of points the profile has
		 * @type {?boolean}
		 */
		this.points = data.points;

		this.data = {
				/**
				 * Whether the profile is a child or not
				 * @type {boolean}
				 * @readonly
				 */
				IsChildAccount: data.data.IsChildAccount,

				/**
				 * The perk preferences of the profile
				 * @type {PerkPreferences}
				 * @readonly
				 */
				PerkPreferences: data.data.PerkPreferences,

				/**
				 * Whether the 2v2 prompt is shown
				 * @type {number}
				 * @readonly
				 */
				'2v2_prompt_shown': data.data['2v2_prompt_shown'],
				};

		/**
		 * The profile's server data
		 * @type {ServerData}
		 */
		this.server_data = data.server_data;

		/**
		 * The profile's match data, by mode
		 * @type {ModeStats}
		 */
		this.matches = data.matches;

		/**
		 * The profile's cross match results
		 * @type {Object}
		 */
		this.cross_match_results = data.cross_match_results;

		/**
		 * The profile's notifications
		 * @type {Object}
		 */
		this.notifications = data.notifications;

		/**
		 * Aggregates for the profile
		 * @type {Object}
		 */
		this.aggregates = data.aggregates;

		/**
		 * Calculations for the profile
		 * @type {Object}
		 */
		this.calculations = data.calculations;

		/**
		 * An array of files
		 * @type {Object[]}
		 */
		this.files = data.files;

		/**
		 * An array of user segments
		 * @type {string[]}
		 */
		this.user_segments = data.user_segments;

		/**
		 * The profile's random distribution
		 * @type {number}
		 */
		this.random_distribution = data.random_distribution;

		/**
		 * The profile's stats in 2v2s
		 * @type {ModeData}
		 */
		this['2v2'] = data['2v2'];

		/**
		 * The profile's stats in ffa matches
		 * @type {ModeData}
		 */
		this.ffa = data.ffa;

		/**
		 * The profile's stats in 1v1s
		 * @type {ModeData}
		 */
		this['1v1'] = data['1v1'];
		}

  /**
   * The time the profile was created at
   * @type {Date}
   * @readonly
   */
	get createdAt() {
    return new Date(this.created_at);
  }
}

/**
 * @typedef {Object} PerkPreferences
 * @property {Object} Characters Object of characters
 */

/**
 * @typedef {Object} StatTrackers
 * @property {number} HighestDamageDealt The user's highest damage dealt
 * @property {number} TotalAttacksDodged The user's total attacks dodged
 * @property {number} TotalAssists The user's total assists
 * @property {number} TotalRingoutLeader The user's total number of times they've been a ringout leader
 * @property {number} TotalRingouts The user's total ringouts
 * @property {number} TotalWins The user's total wins
 * @property {Object} character_wins The user's character wins
 * @property {number} TotalDoubleRingouts The user's total double ringouts
 */

/**
 * @typedef {Object} ServerData
 * @property {number} debug_all_unlocked Debug flag specifying if the user has everything unlocked
 * @property {number} Level The user's level
 * @property {number} CurrentXP The user's current XP
 * @property {number} loss_streak The user's loss streak
 * @property {string} BattlepassID The user's battle pass ID
 * @property {StatTrackers} stat_trackers An object containing stat trackers
 * @property {Object} UnclaimedCharacterMasteryRewards The user's unclaimed character mastery rewards
 * @property {number} lifetime_damage The user's lifetime damage
 * @property {number} lifetime_ringouts The user's lifetime ringouts
 * @property {number} matches_played The number of matches a user has played
 * @property {number} sets_played The number of sets a user has played
 * @property {Object} OwnedPerks An objects of the user's owned perks by character
 * @property {Object} ['1v1shuffle'] Data on a users's performance in 1v1s, for use in matchmaking
 * @property {Object} Characters Data on the user's characters
 * @property {Object} ['2v2shuffle'] Data on a users's performance in 2v2s, for use in matchmaking
 * @property {string[]|[]} RecentlyToasted An array of IDs the user recently toasted
 */

/**
 * @typedef {Object} ModeStats
 * @property {ModeData} ['2v2'] The user's stats for 2v2s
 * @property {ModeData} ffa The user's stats for FFA matches
 * @property {ModeData} ['1v1'] The user's stats for 1v1s
 */

/**
 * @typedef {Object} ModeData
 * @property {number} loss The number of losses the user has in this mode
 * @property {number} win_streak The win streak the user has in this mode
 * @property {number} longest_win_streak The longest win streak the user has had in this mode
 * @property {number} loss The number of wins the user has in this mode
 */

module.exports = Profile;
