const config = {
  watchAll: false,
  verbose: true,
  testEnvironment: "jsdom",
  roots: ["<rootDir>/__tests__/"],
  "moduleNameMapper": {
    "\\.(css|less)$": "identity-obj-proxy"
  },
};

module.exports = config;
