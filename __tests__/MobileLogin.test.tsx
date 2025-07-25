/**
 *
 * What we are testing here:
 *
 * This test suite verifies the rendering behavior of the <MobileLogin /> component.
 * It ensures that the essential UI elements are present and correct during the initial render.
 *
 * The test uses mocked:
 *   - `sendOTP` function from the auth service
 *
 * Covered in this test:
 * 1. Renders the mobile number input field with the correct placeholder.
 * 2. Displays the "Send OTP" button.
 * 3. Renders the terms and conditions text including the link.
 * 4. Validates that no error messages are shown initially.
 */

import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import MobileLogin from '../src/components/auth/MobileLogIn';

jest.mock('react-native-country-picker-modal', () => ({
  __esModule: true,
  default: () => null, // mock CountryPicker to prevent errors in test
}));

jest.mock('../src/Services/auth/index.tsx', () => ({
  sendOTP: jest.fn(),
}));

describe('MobileLogin', () => {
  it('renders the mobile number input field', async () => {
    render(<MobileLogin />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('98765-43210')).toBeTruthy();
    });
  });

  it('renders the "Send OTP" button', async () => {
    render(<MobileLogin />);
    await waitFor(() => {
      expect(screen.getByText('Send OTP')).toBeTruthy();
    });
  });

  it('renders the "Terms & Conditions" text', async () => {
    render(<MobileLogin />);
    await waitFor(() => {
      expect(screen.getByText(/By logging in, you agree to our/i)).toBeTruthy();
      expect(screen.getByText('Terms & Conditions')).toBeTruthy();
    });
  });

  it('does not display an error message initially', async () => {
    render(<MobileLogin />);
    await waitFor(() => {
      expect(screen.queryByText('Mobile number is required')).toBeNull();
      expect(
        screen.queryByText('Please enter a valid 10-digit number'),
      ).toBeNull();
    });
  });
});
