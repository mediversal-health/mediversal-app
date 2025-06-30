// jest.config.js
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json', // Point to a separate tsconfig for Jest if needed, or tsconfig.json
    },
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  setupFilesAfterEnv: ['./jest-setup.ts'], // Optional: for global test setup

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|react-native-country-picker-modal|@react-navigation)',
  ],
};
