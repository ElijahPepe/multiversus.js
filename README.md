# multiversus.js

## About
A simple Node.js module to access the MultiVersus API.

## Installation
```sh
npm install multiversus.js
```

## Example usage
To create a client, an access token, API key, and client ID are necessary. To retrieve these values, a tool such as [Fiddler](https://www.telerik.com/fiddler) is required. The required values can then be retrieved by analyzing the network requests made from MultiVersus.

Initialize the client:
```js
const { Client } = require('multiversus.js');
const client = new Client('accessToken', 'apiKey', 'clientId', 'userAgent');
```

Get the MultiVersus 2v2 leaderboard:
```js
const leaderboardData = await client.getLeaderboard('2v2'); // The type of the leaderboard to be retrieved can also be set to '1v1'.
console.log(JSON.parse(leaderboardData));
```

Get a profile by a user's ID:
```js
const userData = await client.getProfile('621921decb3d515a435270a1');
console.log(JSON.parse(userData));
```

Search for users:
```js
const searchData = await client.searchByUsername('ElijahPepe'); // A second parameter can also be defined to limit the results returned.
console.log(JSON.parse(searchData));
```