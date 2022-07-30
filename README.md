# multiversus.js

## About
A simple Node.js module to access the MultiVersus API.

## Installation
```sh
npm install multiversus.js
```

## Example usage
To create a client, an access token, API key, and client ID are necessary. To retrieve these values, a tool such as [Fiddler](https://www.telerik.com/fiddler) is required. The required values can then be retrieved by analyzing the network requests made from MultiVersus.

Get the MultiVersus 2v2 leaderboard:
```js
const { Client } = require('multiversus.js');
const client = new Client('accessToken', 'apiKey', 'clientId', 'userAgent')

const data = await client.getLeaderboard()
console.log(JSON.parse(data))
```