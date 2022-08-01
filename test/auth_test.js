'use strict';

import { Client } from '../index.js';
import { steamTicket, apiKey, clientId } from './auth.js'

const client = new Client(steamTicket, apiKey, clientId);
await client.auth()

console.log(await client.getMatches("62e0fc71fff9efd4bb52faa6"))