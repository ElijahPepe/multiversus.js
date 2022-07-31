'use strict';

import assert from 'node:assert';
import { accessToken, apiKey, clientId } from './auth.js'
import { Client } from '../index.js';

const client = new Client(accessToken, apiKey, clientId);

const userId = '62e471bc5f77e966a384a570'
const userData = await client.getProfile(userId);
try {
	console.log(userId)
	assert.strictEqual(userData.account_id, userId);
} catch (err) {
	console.error(err);
}