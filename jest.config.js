module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: ['/lib/'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
  },
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    'actions/cache': '<rootDir>/mocks/actions/cache.js',
  },
  roots: ['<rootDir>/packages'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
}
