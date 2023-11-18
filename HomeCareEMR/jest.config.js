export default {
  testEnvironment: "jsdom",
  transform: {
    // "^.+\\.jsx?$": "babel-jest",
      "\\.js$": "<rootDir>/node_modules/babel-jest",
      "\\.jsx$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png|jpg)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
};