import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import MobileLogin from '../src/components/auth/MobileLogIn';

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
