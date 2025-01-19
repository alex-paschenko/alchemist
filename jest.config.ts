import type { Config } from 'jest';

const config: Config = {
  rootDir: './',

  roots: [
    "<rootDir>/src",
    "<rootDir>/test",
  ],

  preset: 'ts-jest',

  testEnvironment: 'node',

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts",
  ],
  coverageDirectory: "coverage",

  testMatch: ['**/*.test.ts'],
};

export default config;
