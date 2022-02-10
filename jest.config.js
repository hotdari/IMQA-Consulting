module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: [
    '<rootDir>/**/*.test.(js|jsx|ts|tsx)', '<rootDir>/(tests/layer/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'
  ],
  transformIgnorePatterns: ['/node_modules/'],
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  testEnvironment: 'jsdom'
}
