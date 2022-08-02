'use strict';

import SteamUser from 'steam-user';
import { fetch } from 'undici';
import { base, apiKey, userAgent } from './utils/constants.js';

export class Client {
	constructor(accessToken, clientId) {
		this.accessToken = accessToken;
		this.apiKey = apiKey;
		this.clientId = clientId;
		this.userAgent = userAgent;
	}

	login(username, password) {
		return new Promise((resolve, reject) => {
			const steamUser = new SteamUser();
			try {
				steamUser.logOn({ accountName: username, password });
			} catch (err) {
				throw new Error('Invalid Steam username or password provided!');
			}
			steamUser.on('loggedOn', async (details) => {
				const ticket = await steamUser.getEncryptedAppTicket(1818750, null);
				const data = await this.info(ticket.encryptedAppTicket.toString('hex'));
				this.accessToken = data.token;
			});
			resolve(this);
		});
	}

	fetchData({ url, method = 'GET', body = null, headers } = {}) {
		return fetch(url, {
			headers: headers ?? {
				'x-hydra-api-key': this.apiKey,
				'x-hydra-client-id': this.clientId,
				'x-hydra-user-agent': this.userAgent,
				'Content-Type': 'application/json',
			},
			method,
			body,
		}).then(async (res) => {
			return await res.json();
		});
	}

	info(steamTicket) {
		return new Promise(async (resolve, reject) => {
			if (!steamTicket) {
				throw new Error('A Steam ticket must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/access`,
				method: 'POST',
				body: JSON.stringify({
					auth: { fail_on_missing: true, steam: steamTicket },
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

	searchByUsername(username, limit = 25) {
		return new Promise(async (resolve, reject) => {
			if (!username) {
				throw new Error('A query must be provided.');
			}
			const data = await this.fetchData({
				url: `${base}/profiles/search_queries/get-by-username/run?username=${username}&limit=${limit}`,
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
}

export class CharacterData {
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
}
