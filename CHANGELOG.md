# Changelog

All notable changes to this project will be documented in this file.

# [2.1.2] - 2022-09-02

## Bug Fixes

- Fix Steam auth, implement steam-totp support ([ffafaa6](https://github.com/ElijahPepe/multiversus.js/commit/ffafaa6c1c60adcaa427cf962cd469864a081b5f))
- Properly emit events ([1618a0f](https://github.com/ElijahPepe/multiversus.js/commit/1618a0f5e80c9a9e4f849e28143e4a6b157d2f54))

# Changelog

All notable changes to this project will be documented in this file.

# [2.1.1] - 2022-08-29

## Bug Fixes

- Fix Steam auth, emit events, fix profiles ([c6de14b](https://github.com/ElijahPepe/multiversus.js/commit/c6de14b157e29fe82a9ddbed33ca7d8fbb08b4e3))

## Miscellaneous Tasks

- Refactor data flow ([44c11e0](https://github.com/ElijahPepe/multiversus.js/commit/44c11e09015a912beeb27de8cffabf30e7b72267))

# Changelog

All notable changes to this project will be documented in this file.

# [2.1.0] - 2022-08-25

## Bug Fixes

- Fix Steam auth ([47ef918](https://github.com/ElijahPepe/multiversus.js/commit/47ef91882a2a83f0f6e5d9ee3bbb4b7787be830c))

## Miscellaneous Tasks

- Update JSDoc defs ([e620c88](https://github.com/ElijahPepe/multiversus.js/commit/e620c88a8fef0f80d7fe55732c997f639c6605de))
- Updating typings ([a7701cd](https://github.com/ElijahPepe/multiversus.js/commit/a7701cda35d6417bf700e5569a5682bff92d790b))

# Changelog

All notable changes to this project will be documented in this file.

# [2.0.1] - 2022-08-20

## Miscellaneous Tasks

- Update typings ([e0de5a0](https://github.com/ElijahPepe/multiversus.js/commit/e0de5a0761e69f0e4a0f8b371af1e61aa4929293))

# [2.0.0] - 2022-08-20

## Miscellaneous Tasks

- Bump undici ([f287d0c](https://github.com/ElijahPepe/multiversus.js/commit/f287d0c61e2cc5277912d8d779d3522b8db7e816))
- Refactor ([e867103](https://github.com/ElijahPepe/multiversus.js/commit/e8671031baef9025cca17e6de1e57bbe9f80c268))
  - **BREAKING CHANGE:** use managers for API stuff
  - **BREAKING CHANGE:** use an object for client options
  - split up typings
- Restructure project ([6b7388d](https://github.com/ElijahPepe/multiversus.js/commit/6b7388d295db66a346234f00a4acd74a79b2611a))

# [1.4.0] - 2022-08-15

## Features

- Add cursor to profile searching ([ebc19d1](https://github.com/ElijahPepe/multiversus.js/commit/ebc19d11ba2308e618877ec37747d64c797a6062))

## Miscellaneous Tasks

- Implement a minimum node version ([ecaf494](https://github.com/ElijahPepe/multiversus.js/commit/ecaf494a7e919a87a0e0e08a0152962c231f1eab))
- Make change non-breaking ([b7c1365](https://github.com/ElijahPepe/multiversus.js/commit/b7c1365123b06250759cb7d38ca00d5ad0de3d02))

# [1.3.1] - 2022-08-09

## Features

- Add typings for missing Client methods ([9cdc146](https://github.com/ElijahPepe/multiversus.js/commit/9cdc146dbb4dd0b69a068985e8629dd0a57232ad))

# [1.3.0] - 2022-08-08

## Bug Fixes

- Remove arrow parens ([98571d5](https://github.com/ElijahPepe/multiversus.js/commit/98571d5d5c0e460078053efdb18f208ed9bb7eac))
- Use CommonJS imports/exports ([f1084b4](https://github.com/ElijahPepe/multiversus.js/commit/f1084b436b0c0beae8113e42bd1ffd234775d32a))

# [1.2.2] - 2022-08-07

## Miscellaneous Tasks

- Update typings ([02d7692](https://github.com/ElijahPepe/multiversus.js/commit/02d76920ad07809d099fdac5d54094325522b861))

# [1.2.1] - 2022-08-05

## Bug Fixes

- Properly call info() ([70ca434](https://github.com/ElijahPepe/multiversus.js/commit/70ca434704dcde68e718cbd78d2cad47f696507e))

# [1.2.0] - 2022-08-05

## Bug Fixes

- Fix Steam auth ([112b4a5](https://github.com/ElijahPepe/multiversus.js/commit/112b4a5f50ecfb27cf207f46d17df79a57617953))

## Features

- Add Rick Sanchez to character data ([21dbe3b](https://github.com/ElijahPepe/multiversus.js/commit/21dbe3b8d7b13444421ba3e6e51c9fb61d7463f5))

## Miscellaneous Tasks

- Add typing for rick ([1dab289](https://github.com/ElijahPepe/multiversus.js/commit/1dab2893c0f29279f61f2dbd208dec0ed8fd2769))
- Move typedoc to dev dependencies ([6a2d5a6](https://github.com/ElijahPepe/multiversus.js/commit/6a2d5a62eccb7a5e8cc15233c508ed81e2a4a0da))

# [1.1.2] - 2022-08-03

## Documentation

- Generate docs ([0d27036](https://github.com/ElijahPepe/multiversus.js/commit/0d2703671f27bef1655f430a8dcdda27eca7f225))

## Refactor

- Implement steamTicket, improve typings ([5cd191e](https://github.com/ElijahPepe/multiversus.js/commit/5cd191ea46dccfe7c64dc5bc88e056b75d240978))

# [1.1.1] - 2022-08-03

## Bug Fixes

- Revert changes to login() ([48f99f6](https://github.com/ElijahPepe/multiversus.js/commit/48f99f6b3a21e5950a7ea5b9b2063dc1aa0b6175))
- Handle Steam Guard users in login() ([1452f5c](https://github.com/ElijahPepe/multiversus.js/commit/1452f5cabde1ebeae8d8aac1c9e5318d6b46b4d5))

## Miscellaneous Tasks

- Clarify login() in README ([ce8fe98](https://github.com/ElijahPepe/multiversus.js/commit/ce8fe986b9567a51c1c4948e7c9948cea7eb00a5))

## Refactor

- Remove clientId from Client ([d84ec6d](https://github.com/ElijahPepe/multiversus.js/commit/d84ec6d38425773e5d212a8600330f19887f2c1d))

# [1.1.0] - 2022-08-03

## Bug Fixes

- Resolve ESLint issues ([f3c8782](https://github.com/ElijahPepe/multiversus.js/commit/f3c878249458836feeb52523ceb2c83e6b9d3a6a))
- Add types location to package.json ([038a753](https://github.com/ElijahPepe/multiversus.js/commit/038a7538c539a7db56dcd5b9d6994fcc070135f9))
- Add additional details to info() ([8746fef](https://github.com/ElijahPepe/multiversus.js/commit/8746fef18ed78d487f811739af98a499b0dbacaf))

## Documentation

- Init docs at /docs ([1f4675f](https://github.com/ElijahPepe/multiversus.js/commit/1f4675f2bfe1b973c04a0cd0e743debb18ee61ee))

## Miscellaneous Tasks

- Add ci to commitlint ([77592d3](https://github.com/ElijahPepe/multiversus.js/commit/77592d3807da7e9d4ff3d320e49f248a7ab62bd3))
- Initialize .github files ([26e7388](https://github.com/ElijahPepe/multiversus.js/commit/26e7388cd0cff81a4bd34f90c238a14502b76004))
- Housekeeping ([790fa54](https://github.com/ElijahPepe/multiversus.js/commit/790fa54b4c6d3cc08df8753f9225a128e20ca415))
- Update README to include login() info ([a4d6f9d](https://github.com/ElijahPepe/multiversus.js/commit/a4d6f9d29a0f8eaaa5f29f619991b0d8aaea1dbc))
- Release multiversus.js@1.0.6 ([96c8513](https://github.com/ElijahPepe/multiversus.js/commit/96c8513473defba6bb385d960db9f1a186ee531a))

## Testing

- Add proper tests to refactor.js ([74a2e14](https://github.com/ElijahPepe/multiversus.js/commit/74a2e14413b1ee884e3337e501b51fe8e6798d49))
