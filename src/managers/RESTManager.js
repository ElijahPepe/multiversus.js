/* eslint-disable no-async-promise-executor */
const { request } = require('undici');
const BaseManager = require('./BaseManager');
const { base, apiKey, userAgent } = require('../util/Constants.js');

/**
 * Manages API methods for profiles
 * @extends {BaseManager}
 */
class RESTManager extends BaseManager {
	/**
	 * GETs a URL
	 * @param {string} url The URL to GET
	 * @param {boolean?} accessToken If an access token should be supplied
	 * @returns {Dispatcher.ResponseData}
	 */
	async get(url, accessToken = true) {
		let headers = {
			'x-hydra-api-key': apiKey,
			'x-hydra-user-agent': userAgent,
			'x-hydra-access-token': this.client.accessToken,
			'Content-Type': 'application/json',
		};
		if (!accessToken) {
			headers = {
				'x-hydra-api-key': apiKey,
				'x-hydra-user-agent': userAgent,
				'Content-Type': 'application/json',
			};
		}
		const res = await request(base + url, { headers });
		return res.body.json();
	}

	/**
	 * POSTs a URL
	 * @param {string} url The URL to POST to
	 * @param {Object?} body The body
	 * @returns {Dispatcher.ResponseData}
	 */
	async post(url, body) {
		const headers = {
			'x-hydra-api-key': apiKey,
			'x-hydra-user-agent': userAgent,
			'Content-Type': 'application/json',
		};
		const res = await request(base + url, { method: 'POST', headers, body });
		return JSON.parse(res.body._readableState.buffer.head.data);
	}
}

module.exports = RESTManager;
