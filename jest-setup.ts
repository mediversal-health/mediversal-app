// jest-setup.ts
// This file is for global test setup and mocks.

// Mock AsyncStorage as recommended by its documentation for Jest environments.
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  flushGetRequests: jest.fn(),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve(null)),
  multiRemove: jest.fn(() => Promise.resolve(null)),
  mergeItem: jest.fn(() => Promise.resolve(null)),
  multiMerge: jest.fn(() => Promise.resolve(null)),
}));

// Mock the @react-navigation/native useNavigation hook
// This is necessary because OtpMobileModal uses useNavigation,
// and in a isolated component test, there's no actual NavigationContainer.
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      // Add other navigation methods your component might use, e.g.:
      // dispatch: jest.fn(),
      // setOptions: jest.fn(),
    }),
  };
});

// If you are using custom matchers from @testing-library/jest-native
// uncomment the line below:
// import '@testing-library/jest-native/extend-expect';

// Example: Mocking other modules that cause issues in Jest environment
// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');
//   Reanimated.default.call = () => {};
//   return Reanimated;
// });
// jest.mock('react-native-gesture-handler', () => {});
