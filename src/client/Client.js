/* eslint-disable no-async-promise-executor */
const process = require('node:process');
const SteamUser = require('steam-user');
const AccountManager = require('../managers/AccountManager');
const BattlepassManager = require('../managers/BattlepassManager');
const ClanManager = require('../managers/ClanManager');
const LeaderboardManager = require('../managers/LeaderboardManager');
const MatchManager = require('../managers/MatchManager');
const ProfileManager = require('../managers/ProfileManager');
const QuestManager = require('../managers/QuestManager');
const { apiKey, userAgent } = require('../util/Constants.js');
const { fetchData, handleData } = require('../util/Data');

/**
 * The base client for interacting with the MultiVersus API.
 */
class Client {
	/**
	 * @param {ClientOptions} options Options for the client
	 */
	constructor(options = {}) {
		Object.defineProperty(this, 'accessToken', { writable: true });
		if (options?.accessToken) {
			this.accessToken = options?.accessToken;
		} else if (!this.accessToken && 'MULTIVERSUS_ACCESS_TOKEN' in process.env) {
			this.accessToken = process.env.MULTIVERSUS_ACCESS_TOKEN;
		} else {
			this.accessToken = null;
		}

		this.steamUser = new SteamUser({ autoRelogin: true, promptSteamGuardCode: false });

		this.steamTicket = null;

		this.apiKey = apiKey;

		this.userAgent = userAgent;

		this.user = null;

		this.ready = false;

		/**
		 * The profile manager of the client
		 * @type {ProfileManager}
		 */
		this.profiles = new ProfileManager(this);

		/**
		 * The match manager of the client
		 * @type {MatchManager}
		 */
		this.matches = new MatchManager(this);

		/**
		 * The account manager of the client
		 * @type {AccountManager}
		 */
		this.accounts = new AccountManager(this);

		/**
		 * The leaderboard manager of the client
		 * @type {LeaderboardManager}
		 */
		this.leaderboards = new LeaderboardManager(this);

		/**
		 * The battlepass manager of the client
		 * @type {BattlepassManager}
		 */
		this.battlepasses = new BattlepassManager(this);

		/**
		 * The quest manager of the client
		 * @type {QuestManager}
		 */
		this.quests = new QuestManager(this);

		/**
		 * The clan manager of the client
		 * @type {ClanManager}
		 */
		this.clans = new ClanManager(this);
	}

	/**
	 * Creates an access token, allowing you to access the MultiVersus API.
	 * @param {string} username Username of the account to log in with
	 * @param {string} password Password of the account to log in with
	 * @returns {Promise<string>} The access token
	 * @example
	 * client.login('username', 'password');
	 */
	login(username, password) {
		this.ready = false;
		this.steamUser.logOn({ accountName: username, password: password });
		this.steamUser.on('debug', debug => {
			console.log(debug);
		});
		this.steamUser.on('loggedOn', async () => {
			await this._getAccessToken();
		});
		this.ready = true;
		return this.accessToken;
	}

	/**
	 * Returns whether or not the client is ready.
	 * @returns {boolean}
	 */
	isReady() {
		return this.ready;
	}

	_getAccessToken() {
		return new Promise(resolve => {
			this.steamUser.getEncryptedAppTicket(1818750, async (err, appTicket) => {
				this.steamTicket = appTicket.toString('hex').toUpperCase();
				if (err) {
					throw new Error(err);
				}

				const data = await this.info(appTicket.toString('hex').toUpperCase());
				this.accessToken = data.token;

				resolve(this);
			});
		});
	}

	/**
	 * Destroys the client and logs out of Steam gracefully.
	 * @returns {void}
	 */
	destroy() {
		super.destroy();

		if (this.steamTicket) {
			this.SteamUser.logOff();
		}
		this.accessToken = null;
	}

	/**
	 * Gets info about a Steam user
	 * @param {string} steamTicket Steam ticket of the user to log in with
	 * @returns {Promise<Object>} The info
	 * @example
	 * client.info('steamTicket');
	 */
	info(steamTicket) {
		return new Promise(async (resolve, reject) => {
			if (!steamTicket && !this.steamTicket) {
				throw new Error('A Steam ticket must be provided.');
			}
			const data = await fetchData({
				url: `/access`,
				method: 'POST',
				body: JSON.stringify({
					auth: { fail_on_missing: true, steam: this.steamTicket ? this.steamTicket : steamTicket },
					options: [
						'configuration',
						'achievements',
						'account',
						'profile',
						'notifications',
						'maintenance',
						'wb_network',
					],
				}),
				accessToken: false,
			});
			handleData(data, resolve, reject);
			this.user = data;
			return this.user;
		});
	}
}

module.exports = Client;

/**
 * Client options.
 * @typedef {Object} ClientOptions
 * @property {string} [accessToken] The access token of the user
 */
