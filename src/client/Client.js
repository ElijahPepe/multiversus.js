const { EventEmitter } = require('node:events');
const process = require('node:process');
const SteamTotp = require('steam-totp');
const SteamUser = require('steam-user');
const AccountManager = require('../managers/AccountManager');
const BattlepassManager = require('../managers/BattlepassManager');
const ClanManager = require('../managers/ClanManager');
const LeaderboardManager = require('../managers/LeaderboardManager');
const MatchManager = require('../managers/MatchManager');
const ProfileManager = require('../managers/ProfileManager');
const QuestManager = require('../managers/QuestManager');
const RESTManager = require('../managers/RESTManager');
const { apiKey, userAgent } = require('../util/Constants.js');
const Events = require('../util/Events');
const Routes = require('../util/Routes');

/**
 * The base client for interacting with the MultiVersus API.
 */
class Client extends EventEmitter {
	/**
	 * @param {ClientOptions} options Options for the client
	 */
	constructor(options = {}) {
    super({ captureRejections: true });
		Object.defineProperty(this, 'accessToken', { writable: true });
		if (options?.accessToken) {
			this.emit(Events.ClientReady, this);
			this.accessToken = options?.accessToken;
		} else if (!this.accessToken && 'MULTIVERSUS_ACCESS_TOKEN' in process.env) {
			this.emit(Events.ClientReady, this);
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

		/**
		 * The REST manager of the client
		 * @type {RESTManager}
		 */
		this.rest = new RESTManager(this);
	}

	/**
	 * Creates an access token, allowing you to access the MultiVersus API.
	 * @param {string} username Username of the account to log in with
	 * @param {string} password Password of the account to log in with
	 * @param {string?} token The account's Steam secret
	 * @returns {Promise<string>} The access token
	 * @example
	 * client.login('username', 'password');
	 */
	async login(username, password, token) {
		this.ready = false;
		this.emit(Events.Debug, `Provided client info username as ${username} and password as ${password}`);

		let code;
		if (token) {
			code = SteamTotp.generateAuthCode(token);
		}
		try {
			await this.getAccessToken(username, password, code);
			return this.accessToken;
		} catch (error) {
			this.destroy();
			throw error;
		}
	}

	/**
	 * Returns whether or not the client is ready.
	 * @returns {boolean}
	 */
	isReady() {
		return this.ready;
	}

	/**
	 * Gets an access token for a user
	 * @param {string} username Username of the account to log in with
	 * @param {string} password Password of the account to log in with
	 * @param {string?} code The account's Steam two-factor authentication code
	 * @private
	 * @returns {Promise<void>} A promise that either resolves the client or rejects it
	 * @example
	 * client.login('username', 'password');
	 */
	getAccessToken(username, password, code) {
		if (this.ready) {
			return Promise.resolve();
		}
		return new Promise(resolve => {
			this.emit(Events.Debug, 'Preparing to connect to Steam...');
			this.steamUser.logOn({ accountName: username, password });
			if (code) {
				this.steamUser.once('steamGuard', (_, callback) => {
					callback(code);
				});
			}
			this.steamUser.once('loggedOn', async () => {
				await this.steamUser.getEncryptedAppTicket(1818750, async (err, appTicket) => {
					this.steamTicket = appTicket.toString('hex').toUpperCase();
					if (err) {
						throw new Error(err);
					}

					const data = await this.info(appTicket.toString('hex').toUpperCase());
					this.ready = true;
					this.accessToken = data.token;
					this.steamUser.removeAllListeners();

					this.emit(Events.ClientReady, this);

					resolve(this);
				});
			});
		});
	}

	/**
	 * Destroys the client and logs out of Steam gracefully.
	 * @returns {void}
	 */
	async destroy() {
		if (this.steamTicket) {
			this.SteamUser.logOff();
		}
		await this.rest.delete(Routes.access());
		this.accessToken = null;
		this.destroy();
	}

	/**
	 * Gets info about a Steam user
	 * @param {string} steamTicket Steam ticket of the user to log in with
	 * @returns {Promise<any>} The info
	 * @example
	 * client.info('steamTicket');
	 */
	async info(steamTicket) {
		if (!steamTicket && !this.steamTicket) {
			throw new Error('A Steam ticket must be provided.');
		}
		const data = await this.rest.post(
			Routes.access(),
			JSON.stringify({
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
		);
		this.user = data;
		return this.user;
	}
}

module.exports = Client;

/**
 * Client options.
 * @typedef {Object} ClientOptions
 * @property {string} [accessToken] The access token of the user
 */

/**
 * Emitted for general debugging information.
 * @event Client#debug
 * @param {string} info The debug information
 */
