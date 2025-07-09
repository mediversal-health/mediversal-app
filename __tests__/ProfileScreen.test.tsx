/**
 *
 * What we are testing here:
 *
 * This test suite verifies the rendering behavior of the <ProfileScreen /> component.
 * It focuses on checking whether the screen correctly displays user information and UI elements.
 *
 * The test uses mocked:
 *   - Zustand stores (authStore, screenSelector, toastStore)
 *   - Navigation hooks
 *   - `updateProfile` API call from the auth service
 *
 * Covered in this test:
 * 1. Displays user full name, contact number, and profile metadata.
 * 2. Renders key action buttons: Edit Info, Address Book, Logout, and Delete User.
 */

import { render } from '@testing-library/react-native';
import ProfileScreen from '../src/Screens/ProfileScreen';

jest.spyOn(console, 'log').mockImplementation(() => {});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('../src/store/authStore', () => ({
  useAuthStore: jest.fn(() => ({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    birthday: '1990-05-15T00:00:00.000Z',
    joinedDate: '2023-01-01T00:00:00.000Z',
    customer_id: 'cust123',
    profileImage: null,
    setAuthentication: jest.fn(),
    clearAuthentication: jest.fn(),
  })),
}));

jest.mock('../src/store/screenSelector', () => ({
  useScreenStore: jest.fn(() => ({
    currentScreen: 'Profile',
  })),
}));

jest.mock('../src/store/toastStore', () => ({
  useToastStore: jest.fn(() => ({
    showToast: jest.fn(),
  })),
}));

jest.mock('../src/Services/auth', () => ({
  updateProfile: jest.fn(),
}));

describe('ProfileScreen', () => {
  it('renders correctly with basic information', () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText('JohnDoe')).toBeTruthy();
    expect(getByText('Information')).toBeTruthy();
    expect(getByText('Edit Info')).toBeTruthy();
    expect(getByText('Address Book')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
    expect(getByText('Delete User')).toBeTruthy();
    expect(getByText('1234567890')).toBeTruthy();
  });
});
