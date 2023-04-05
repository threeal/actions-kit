const config = require("@actions-kit/dev-jest");
config.moduleNameMapper = {
  'actions/cache': '<rootDir>/node_modules/@actions-kit/mock-actions-cache/lib/index.js',
};
module.exports = config;
