/**
 * Jest configuration (CommonJS form on purpose).
 *
 * WebContainer doesn't have ts-node available out of the box, so the
 * TypeScript form (jest.config.ts) fails to load with:
 *   "Multiple configurations found" or "Cannot find module 'ts-node'".
 * Keeping this file as plain JS sidesteps both issues — Jest reads the
 * config natively, then Babel/SWC handles TS test files normally.
 */
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

module.exports = createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
});
