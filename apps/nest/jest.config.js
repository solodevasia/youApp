module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(t|j)s',
    '!<rootDir>/src/main.ts',
    '!<rootDir>/src/app.module.ts',
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    '@youApp/(.*)$': ['<rootDir>/src/$1'],
  },
};
