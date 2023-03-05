module.exports = {
  clearMocks: true,
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
    'actions/core': '<rootDir>/mocks/actions-core.js',
  },
  roots: ['<rootDir>/packages'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
}
