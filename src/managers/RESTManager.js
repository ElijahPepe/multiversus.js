const { request } = require('undici');
const BaseManager = require('./BaseManager');
const MultiVersusAPIError = require('../errors/MultiVersusAPIError');
const { base, apiKey, userAgent } = require('../util/Constants.js');

/**
 * Manages API methods for profiles
 * @extends {BaseManager}
 */
class RESTManager extends BaseManager {
	/**
 	 * Converts the response to usable data
 	 *
	 * @param {Dispatcher.ResponseData} res - The fetch response
 	 */
	// eslint-disable-next-line require-await
	async parseResponse(res) {
		const header = res.headers;
		if (header['content-type'] === 'application/json') {
			return res.body.json();
		}

		return res.body.arrayBuffer();
	}

	/**
	 * Sends a request to a URL
	 * @param {string} url The URL to GET
	 * @param {Object?} options Options for the request
	 * @returns {Dispatcher.ResponseData}
	 */
	async request(url, options) {
		const method = options.method ?? 'GET';
		options.headers = {
			'Content-Type': 'application/json',
			'x-hydra-api-key': apiKey,
			'x-hydra-user-agent': userAgent,
		};
		if (options.accessToken) {
			options.headers['x-hydra-access-token'] = this.client.accessToken;
		}
		options.method = method;
		const res = await request(base + url, { ...options });
		const status = res.statusCode;

		if (status === 200) {
			return res;
		} else {
			const data = await this.parseResponse(res);
			throw new MultiVersusAPIError(data);
		}
	}

	/**
	 * GETs a URL
	 * @param {string} url The URL to GET
	 * @param {boolean?} accessToken If an access token should be supplied
	 * @returns {Dispatcher.ResponseData}
	 */
	async get(url, accessToken = true) {
		const response = await this.request(url, { accessToken });
		return this.parseResponse(response);
	}

	/**
	 * POSTs a URL
	 * @param {string} url The URL to POST to
	 * @param {Object?} body The body
	 * @returns {Dispatcher.ResponseData}
	 */
	async post(url, body) {
		const response = await this.request(url, { method: 'POST', body });
		return this.parseResponse(response);
	}

	/**
	 * DELETEs a URL
	 * @param {string} url The URL to DELETE to
	 * @param {boolean?} accessToken If an access token should be supplied
	 * @returns {Dispatcher.ResponseData}
	 */
	async delete(url, accessToken = true) {
		const response = await this.request(url, { method: 'DELETE', accessToken });
		return this.parseResponse(response);
	}
}

module.exports = RESTManager;
