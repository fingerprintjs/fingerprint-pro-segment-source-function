# Contributing to Fingerprint Pro Segment Source Function

## Working with code

We prefer using [yarn](https://yarnpkg.com/) for installing dependencies and running scripts.

The `main` branch is locked for the push action. 

`main` branch is always where we create releases.

For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first. Create pull requests for `main` branch.

### How to build
After cloning the repo, run `yarn install` to install packages.

Run `yarn build` for creating a build in `dist` folder. After building, `dist/fingerprint-pro-segment-source-function.js` file is created. This file is also used as the release artifact on GitHub.

### Structure

- [src](https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/tree/main/src) - Project source written in TypeScript
- [\_\_tests\_\_](https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/tree/main/__tests__) - All test files

### Updating Webhook Types

This project depends on [the Fingerprint Webhook OpenAPI Schema](https://github.com/fingerprintjs/fingerprint-pro-server-api-openapi). Run `yarn generateTypes` to apply the latest webhook type changes.

### Code style

The code style is controlled by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run to check that the code style is ok:
```shell
yarn lint
```

You aren't required to run the check manually, the CI will do it. Run the following command to fix style issues (not all issues can be fixed automatically):
```shell
yarn lint:fix
```

### Commit style

You are required to follow [conventional commits](https://www.conventionalcommits.org) rules.

### How to test

Run `yarn test` to run unit and integration tests.

For running end-to-end tests locally, follow below steps:

- Ensure you have [playwright](https://github.com/microsoft/playwright) installed
- Create an `.env` file (look at `.env.example`)
- Populate `.env` with required fields
- Run `yarn test:e2e-local`
