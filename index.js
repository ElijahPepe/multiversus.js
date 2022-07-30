import fetch from 'node-fetch';

const base = 'https://dokken-api.wbagora.com'

export class Client {
	constructor(accessToken, apiKey, clientId, userAgent) {
		this.accessToken = accessToken;
		this.apiKey = apiKey;
		this.clientId = clientId;
		this.userAgent = userAgent || 'Hydra-Cpp/1.132.0';
	}

	getLeaderboard() {
		const data = fetch(base + '/leaderboards/2v2/show', {
			headers: {
				'x-hydra-access-token': this.accessToken,
				'x-hydra-api-key': this.apiKey,
				'x-hydra-client-id': this.clientId,
				'x-hydra-user-agent': this.userAgent
			}
		}).then(res => {
			return res.text();
		}).then(json => {
			return json;
		})

		return data;
	}
}