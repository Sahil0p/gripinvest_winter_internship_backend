module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)" // Transform axios ES modules for Jest
    ],
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest" // Use babel-jest to transform JS/TSX
    }
  };
  