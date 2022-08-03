import assert from 'node:assert';
import { clientId, username, password } from './auth.js';
import { Client } from '../src/index.js';

const client = new Client(null, clientId);
await client.login(username, password);

const userId = '62e471bc5f77e966a384a570';
const userData = await client.getAccount(userId);
try {
	console.log(userId);
	assert.strictEqual(userData.account_id, userId);
} catch (err) {
	console.error(err);
}
