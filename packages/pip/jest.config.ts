import config from "@actions-kit/dev-jest";

config.moduleNameMapper = {
  "actions/cache": "@actions-kit/mock-actions-cache/lib/index.js",
};

export default config;
