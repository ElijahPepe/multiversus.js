import fetch from 'node-fetch';

const base = 'https://dokken-api.wbagora.com'

export class Client {
	constructor(accessToken, apiKey, clientId, userAgent) {
		this.accessToken = accessToken;
		this.apiKey = apiKey;
		this.clientId = clientId;
		this.userAgent = userAgent || 'Hydra-Cpp/1.132.0';
	}

	handleData(data, resolve, reject) {
		data.then(res => {
			return res.text();
		}).then(json => {
			if (JSON.parse(json).msg) {
				return reject(new Error(JSON.parse(json).msg));
			}
			return resolve(JSON.parse(json));
		})
	}

	searchByUsername(username, limit = 25) {
		return new Promise((resolve, reject) => {
			if (!username) {
				throw new Error('A query must be provided.')
			}
			const data = fetch(base + `/profiles/search_queries/get-by-username/run?username=${username}&limit=${limit}`, {
				headers: {
					'x-hydra-access-token': this.accessToken,
					'x-hydra-api-key': this.apiKey,
					'x-hydra-client-id': this.clientId,
					'x-hydra-user-agent': this.userAgent
				}
			})
			this.handleData(data, resolve, reject);
		});
	}

	getMatch(id) {
		return new Promise((resolve, reject) => {
			if (!id) {
				throw new Error('A match ID must be provided.')
			}
			const data = fetch(base + `/matches/${id}`, {
				headers: {
					'x-hydra-access-token': this.accessToken,
					'x-hydra-api-key': this.apiKey,
					'x-hydra-client-id': this.clientId,
					'x-hydra-user-agent': this.userAgent
				}
			})
			this.handleData(data, resolve, reject);
		})
	}

	getProfile(id) {
		return new Promise((resolve, reject) => {
			if (!id) {
				throw new Error('A user ID must be provided.')
			}
			const data = fetch(base + `/profiles/${id}`, {
				headers: {
					'x-hydra-access-token': this.accessToken,
					'x-hydra-api-key': this.apiKey,
					'x-hydra-client-id': this.clientId,
					'x-hydra-user-agent': this.userAgent
				}
			})
			this.handleData(data, resolve, reject);
		})
	}

	getProfileLeaderboard(id, type) {
		return new Promise((resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = fetch(base + `/leaderboards/${type}/score-and-rank/${id}`, {
				headers: {
					'x-hydra-access-token': this.accessToken,
					'x-hydra-api-key': this.apiKey,
					'x-hydra-client-id': this.clientId,
					'x-hydra-user-agent': this.userAgent
				}
			})
			this.handleData(data, resolve, reject);
		});
	}

	getProfileLeaderboardForCharacter(id, type, character) {
		return new Promise((resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			if (!character) {
				return reject(new Error('A character must be provided.'));
			}
			const data = fetch(base + `/leaderboards/${character}_${type}/score-and-rank/${id}`, {
				headers: {
					'x-hydra-access-token': this.accessToken,
					'x-hydra-api-key': this.apiKey,
					'x-hydra-client-id': this.clientId,
					'x-hydra-user-agent': this.userAgent
				}
			})
			this.handleData(data, resolve, reject);
		});
	}

	getLeaderboard(type) {
		return new Promise((resolve, reject) => {
			if (type !== '2v2' && type !== '1v1') {
				return reject(new Error('Leaderboard type must be 1v1 or 2v2.'));
			}
			const data = fetch(base + `/leaderboards/${type}/show`, {
				headers: {
					'x-hydra-access-token': this.accessToken,
					'x-hydra-api-key': this.apiKey,
					'x-hydra-client-id': this.clientId,
					'x-hydra-user-agent': this.userAgent
				}
			})
			this.handleData(data, resolve, reject);
		});
	}

	getAllMatches(page = 1) {
		return new Promise((resolve, reject) => {
			const data = fetch(base + `/matches/all?page=${page}`, {
				headers: {
					'x-hydra-access-token': this.accessToken,
					'x-hydra-api-key': this.apiKey,
					'x-hydra-client-id': this.clientId,
					'x-hydra-user-agent': this.userAgent
				}
			})
			this.handleData(data, resolve, reject);
		});
	}

	getMatches(id, page = 1) {
		return new Promise((resolve, reject) => {
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = fetch(base + `/matches/all/${id}?page=${page}`, {
				headers: {
					'x-hydra-access-token': this.accessToken,
					'x-hydra-api-key': this.apiKey,
					'x-hydra-client-id': this.clientId,
					'x-hydra-user-agent': this.userAgent
				}
			})
			this.handleData(data, resolve, reject);
		});
	}
}

export class CharacterData {
	static Shaggy = {
		"id": "character_shaggy"
	}

	static WonderWoman = {
		"id": "character_wonder_woman"
	}

	static Batman = {
		"id": "character_batman"
	}

	static Superman = {
		"id": "character_superman"
	}

	static Taz = {
		"id": "character_taz"
	}

	static IronGiant = {
		"id": "character_C017"
	}

	static Garnet = {
		"id": "character_garnet"
	}

	static StevenUniverse = {
		"id": "character_steven"
	}

	static Jake = {
		"id": "character_jake"
	}

	static Reindog = {
		"id": "character_creature"
	}

	static Finn = {
		"id": "character_finn"
	}

	static Velma = {
		"id": "character_velma"
	}

	static AryaStark = {
		"id": "character_arya"
	}

	static BugsBunny = {
		"id": "character_bugs_bunny"
	}

	static HarleyQuinn = {
		"id": "character_harleyquinn"
	}

	static TomAndJerry = {
		"id": "character_tom_and_jerry"
	}

	static LeBronJames = {
		"id": "character_c16"
	}
}