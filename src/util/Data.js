const { fetch } = require('undici');
const { base, apiKey, userAgent } = require('../util/Constants.js');

async function fetchData({ url, method = 'GET', body = null, accessToken } = {}) {
	let headers = {
		'x-hydra-api-key': apiKey,
		'x-hydra-user-agent': userAgent,
		'x-hydra-access-token': accessToken,
		'Content-Type': 'application/json',
	};
	if (!accessToken) {
		headers = {
			'x-hydra-api-key': apiKey,
			'x-hydra-user-agent': userAgent,
			'Content-Type': 'application/json',
		};
	}
	const res = await fetch(base + url, {
		headers: headers,
		method,
		body,
	});
	return res.json();
}

function handleData(data, resolve, reject) {
	if (data.msg) {
		return reject(new Error(data.msg));
	}
	return resolve(data);
}

module.exports = {
	fetchData,
	handleData,
};
