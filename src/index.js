/* eslint-disable no-async-promise-executor */
const process = require('node:process');
const SteamUser = require('steam-user');
const { fetch } = require('undici');
const { base, apiKey, userAgent } = require('./utils/constants.js');

class Client {
	constructor(accessToken) {
		Object.defineProperty(this, 'accessToken', { writable: true });
		if (accessToken) {
			this.accessToken = accessToken;
		} else if (!this.accessToken && 'MULTIVERSUS_ACCESS_TOKEN' in process.env) {
			this.accessToken = process.env.MULTIVERSUS_ACCESS_TOKEN;
		} else {
			this.accessToken = null;
		}

		this.steamUser = new SteamUser();
		this.steamTicket = null;
		this.apiKey = apiKey;
		this.userAgent = userAgent;
	}

	login(username, password, twoFactorCode) {
		return new Promise(resolve => {
			if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
				throw new Error('Invalid username or password provided.');
			}
			this.steamUser.logOn({ accountName: username, password: password, twoFactorCode: twoFactorCode });
			this.steamUser.on('steamGuard', (_domain, callback) => {
				callback(twoFactorCode);
			});
			this.steamUser.on('loggedOn', () => {
				this.steamUser.getEncryptedAppTicket(1818750, async (err, appTicket) => {
					if (err) {
						throw new Error(err);
					}

					const data = await this.info(appTicket.toString('hex').toUpperCase());

					this.accessToken = data.token;
					resolve(this);
				});
			});
		});
	}

	fetchData({ url, method = 'GET', body = null, accessToken = true } = {}) {
		let headers = {
			'x-hydra-api-key': this.apiKey,
			'x-hydra-user-agent': this.userAgent,
			'x-hydra-access-token': this.accessToken,
			'Content-Type': 'application/json',
		};
		if (!accessToken) {
			headers = {
				'x-hydra-api-key': this.apiKey,
				'x-hydra-user-agent': this.userAgent,
				'Content-Type': 'application/json',
			};
		}
		return fetch(url, {
			headers: headers,
			method,
			body,
			// eslint-disable-next-line arrow-body-style
		}).then(async res => {
			// eslint-disable-next-line no-return-await
			return await res.json();
		});
	}

	info(steamTicket) {
		return new Promise(async (resolve, reject) => {
			if (!steamTicket && !this.steamTicket) {
				throw new Error('A Steam ticket must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/access`,
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
			this.handleData(data, resolve, reject);
		});
	}

	handleData(data, resolve, reject) {
		if (data.msg) {
			return reject(new Error(data.msg));
		}
		return resolve(data);
	}

	searchByUsername(username, limit = 25, cursor = null) {
		return new Promise(async (resolve, reject) => {
			if (!username) {
				throw new Error('A query must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/profiles/search_queries/get-by-username/run?username=${username}&limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getMatch(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A match ID must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/matches/${id}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getProfile(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A user ID must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/profiles/${id}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getAccount(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A user ID must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/accounts/${id}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getProfileLeaderboard(id, type) {
		return new Promise(async (resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = await this.fetchData({
				url: `${base}/leaderboards/${type}/score-and-rank/${id}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getProfileLeaderboardForCharacter(id, type, character) {
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
			const data = await this.fetchData({
				url: `${base}/leaderboards/${character}_${type}/score-and-rank/${id}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getLeaderboard(type) {
		return new Promise(async (resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			const data = await this.fetchData({
				url: `${base}/leaderboards/${type}/show`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getLeaderboardForCharacter(type, character) {
		return new Promise(async (resolve, reject) => {
			if (!this.ready) {
				return reject(new Error('Client is not ready.'));
			}

			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			if (!character) {
				return reject(new Error('A character must be provided.'));
			}
			const data = await this.fetchData({
				url: `${base}/leaderboards/${character}_${type}/show`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getMatches(id, page = 1) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = await this.fetchData({
				url: `${base}/matches/all/${id}?page=${page}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getBattlepass(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A user ID must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/ssc/invoke/get_battlepass?AccountID=${id}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getQuests(id) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				throw new Error('A user ID must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/ssc/invoke/get_quests?AccountID=${id}`,
			});
			this.handleData(data, resolve, reject);
		});
	}

	getClan(id, page = 1, count = 25) {
		return new Promise(async (resolve, reject) => {
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = await this.fetchData({
				url: `${base}/clans/pfg-clan/for/${id}?count=${count}&page=${page}`,
			});
			this.handleData(data, resolve, reject);
		});
	}
}

class CharacterData {
	static Shaggy = {
		id: 'character_shaggy',
		displayName: 'Shaggy',
		aliases: [],
	};

	static WonderWoman = {
		id: 'character_wonder_woman',
		displayName: 'Wonder Woman',
		aliases: [],
	};

	static Batman = {
		id: 'character_batman',
		displayName: 'Batman',
		aliases: [],
	};

	static Superman = {
		id: 'character_superman',
		displayName: 'Superman',
		aliases: [],
	};

	static Taz = {
		id: 'character_taz',
		displayName: 'Taz',
		aliases: [],
	};

	static IronGiant = {
		id: 'character_C017',
		displayName: 'Iron Giant',
		aliases: [],
	};

	static Garnet = {
		id: 'character_garnet',
		displayName: 'Garnet',
		aliases: [],
	};

	static StevenUniverse = {
		id: 'character_steven',
		displayName: 'Steven Universe',
		aliases: [],
	};

	static Jake = {
		id: 'character_jake',
		displayName: 'Jake the Dog',
		aliases: ['Jake'],
	};

	static Reindog = {
		id: 'character_creature',
		displayName: 'Reindog',
		aliases: [],
	};

	static Finn = {
		id: 'character_finn',
		displayName: 'Finn the Human',
		aliases: ['Finn'],
	};

	static Velma = {
		id: 'character_velma',
		displayName: 'Velma',
		aliases: [],
	};

	static AryaStark = {
		id: 'character_arya',
		displayName: 'Arya Stark',
		aliases: [],
	};

	static BugsBunny = {
		id: 'character_bugs_bunny',
		displayName: 'Bugs Bunny',
		aliases: [],
	};

	static HarleyQuinn = {
		id: 'character_harleyquinn',
		displayName: 'Harley Quinn',
		aliases: [],
	};

	static TomAndJerry = {
		id: 'character_tom_and_jerry',
		displayName: 'Tom and Jerry',
		aliases: [],
	};

	static LeBronJames = {
		id: 'character_c16',
		displayName: 'LeBron James',
		aliases: [],
	};

	static RickSanchez = {
		id: 'character_c020',
		displayName: 'Rick Sanchez',
		aliases: ['Rick'],
	};
}

module.exports = {
	Client,
	CharacterData,
};
