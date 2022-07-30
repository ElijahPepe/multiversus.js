import fetch from 'node-fetch';

const base = 'https://dokken-api.wbagora.com'

export class Client {
	constructor(accessToken, apiKey, clientId, userAgent) {
		this.accessToken = accessToken;
		this.apiKey = apiKey;
		this.clientId = clientId;
		this.userAgent = userAgent || 'Hydra-Cpp/1.132.0';
	}

	searchByUsername(username, limit) {
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
		}).then(res => {
			if (res.status === 403) {
				throw new Error('Invalid Access Token')
			} else if (res.status === 401) {
				throw new Error('User session kicked')
			}
			return res.text();
		}).then(json => {
			return json;
		})

		return data
	}

	getProfile(id) {
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
		}).then(res => {
			if (res.status === 404) {
				throw new Error(`'${id}' is not a valid account_id`)
			} else if (res.status === 403) {
				throw new Error('Invalid Access Token')
			} else if (res.status === 401) {
				throw new Error('User session kicked')
			}
			return res.text();
		}).then(json => {
			return json;
		})

		return data;
	}

	getLeaderboard(type) {
		if (type !== '2v2' && type !== '1v1') {
			throw new Error('Leaderboard type must be 1v1 or 2v2.')
		}
		const data = fetch(base + `/leaderboards/${type}/show`, {
			headers: {
				'x-hydra-access-token': this.accessToken,
				'x-hydra-api-key': this.apiKey,
				'x-hydra-client-id': this.clientId,
				'x-hydra-user-agent': this.userAgent
			}
		}).then(res => {
			if (res.status === 403) {
				throw new Error('Invalid Access Token')
			} else if (res.status === 401) {
				throw new Error('User session kicked')
			}
			return res.text();
		}).then(json => {
			return json;
		})

		return data;
	}
}