export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.spec.json" }],
  },
  testMatch: ["**/tests/**/*.spec.ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  // old config
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    // "!src/index.ts",
    // "!src/interfaces/**/*"
  ],
  coverageDirectory: "coverage",
  verbose: true,
  silent: false,
};
