const assert = require('node:assert');
const { username, password } = require('./auth.js');
const { Client } = require('../src/index.js');

const client = new Client();

(async () => {
	await client.login(username, password);
	const userId = '62e471bc5f77e966a384a570';
	const userData = await client.getProfile(userId);
	try {
		console.log(userId);
		assert.strictEqual(userData.account_id, userId);
	} catch (err) {
		console.error(err);
	}
})();
