module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.svg$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };
  