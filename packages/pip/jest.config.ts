import { jestConfig } from "@actions-kit/dev";

export default jestConfig({
  moduleNameMapper: {
    "actions/cache": "@actions-kit/mock-actions-cache/lib/index.js",
  },
});
