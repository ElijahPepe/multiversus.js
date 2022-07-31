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
			if (res.status === 404) {
				return reject(new Error("Not found"))
			} else if (res.status === 403) {
				return reject(new Error('Invalid Access Token'))
			} else if (res.status === 401) {
				return reject(new Error('User session kicked'))
			}
			return res.text();
		}).then(json => {
			return resolve(JSON.parse(json));
		})
	}

	searchByUsername(username, limit) {
		return new Promise((resolve, reject) => {
			if (!limit) {
				limit = 25;
			}
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

	getMatches(id)
	{
		return new Promise((resolve, reject) => {
			if (!id) {
				return reject(new Error('A user ID must be provided.'));
			}
			const data = fetch(base + `/matches/all/${id}`, {
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