<div align="center">
  <h1>
    multiversus.js
  </h1>
	<p>
		<a href="https://discord.gg/Sxqn7hqKZY"><img src="https://img.shields.io/discord/1003096141258309732?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
		<a href="https://www.npmjs.com/package/multiversus.js"><img src="https://img.shields.io/npm/v/multiversus.js.svg?maxAge=3600" alt="npm version" /></a>
	</p>
</div>

## About

A simple Node.js module to access the MultiVersus API.

## Installation

```sh
npm install multiversus.js
yarn add multiversus.js
```

## Example usage

Initialize the client using your Steam username and password (if your account doesn't have Steam Guard):

```js
const { Client } = require('multiversus.js');
const client = new Client();

(async () => {
	await client.login('username', 'password'); // You can initialize the client by supplying your Steam username and password
})();
```

Alternatively, initialize the client as follows, using a pre-existing access token. Access tokens can be obtained by analyzing the network requests made by MultiVersus using a tool such as [Fiddler](https://www.telerik.com/fiddler) (if using Fiddler, make sure HTTPS traffic is decrypted):

```js
const { Client } = require('multiversus.js');
const client = new Client({ 'accessToken' });
```

Get the MultiVersus 2v2 leaderboard:

```js
(async () => {
	const leaderboardData = await client.leaderboards.fetch('2v2'); // The type of the leaderboard to be retrieved can also be set to '1v1'.
	console.log(leaderboardData);
})();
```

Get a profile by a user's ID:

```js
(async () => {
	const userData = await client.profiles.fetch('62e471bc5f77e966a384a570');
	console.log(userData);
})();
```

Search for users:

```js
(async () => {
	const searchData = await client.profiles.search('ElijahPepe'); // A second parameter can also be defined to limit the results returned.
	console.log(searchData);
})();
```

## Links

- [npm](https://www.npmjs.com/package/multiversus.js)
- [GitHub](https://github.com/ElijahPepe/multiversus.js)
- [Discord server](https://discord.gg/Sxqn7hqKZY)
