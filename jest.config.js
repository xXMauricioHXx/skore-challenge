module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}', '!<rootDir>/node_modules/'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  setupFiles: ['./jest-setup-file.ts'],
  testPathIgnorePatterns: [
    '/build/',
    '/node_modules/',
    '/dist/',
    '/__tests__/(setup|helpers|factories|store)/',
  ],
  resetMocks: true,
  testMatch: ['**/?(*.)+(spec).ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '.(ts)': 'ts-jest',
  },
};
