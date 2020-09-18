module.exports = {
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!src/server.ts",
    "!src/index.ts",
    "!src/interfaces/**/*"
  ],
  coverageDirectory: "coverage",
  // setupFiles: ["<rootDir>/tests/test.config.js"],
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/tests/**/*.(spec|test).ts"
  ],
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
