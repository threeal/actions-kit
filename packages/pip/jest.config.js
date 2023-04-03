module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: ["/lib/"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
  },
  moduleFileExtensions: ["js", "ts"],
  moduleNameMapper: {
    'actions/cache': '<rootDir>/node_modules/@actions-kit/mock-actions-cache/lib/index.js',
  },
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  transform: {"^.+\\.ts$": "ts-jest"},
  verbose: true
}
