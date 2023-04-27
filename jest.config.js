/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./__tests__/testSetup.ts'],
  testRegex: '/__tests__/.+test.tsx?$',
  collectCoverageFrom: ['./src/**/**.{ts,tsx}'],
  coverageReporters: ['lcov', 'json-summary', ['text', { file: 'coverage.txt', path: './' }]],
  globals: {
    Segment: {
      identify: () => null,
      page: () => null,
      screen: () => null,
      track: () => null,
      group: () => null,
    },
    handleRequest: () => null,
    handleIdentify: () => null,
    handleTrack: () => null,
    handleGroup: () => null,
    handlePage: () => null,
  },
}
