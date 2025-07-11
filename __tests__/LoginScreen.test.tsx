/**
 *
 * What we are testing here:
 *
 * This test suite verifies the initial rendering of the <LoginScreen /> component.
 * It ensures that the default state (mobile login) loads correctly with all key UI elements.
 *
 * The test uses mocked:
 *   - Child components (MobileLogin, EmailLogin, EmailSignup, ToggleButton)
 *   - SVG asset (Carosel.svg)
 *
 * Covered in this test:
 * 1. Confirms static text elements like headings and subheadings render correctly.
 * 2. Verifies that the MobileLogin component is shown by default.
 * 3. Ensures ToggleButton and SVG are rendered.
 * 4. Checks that email login/signup components and related texts are not visible on initial load.
 */

import React from 'react';
import {render, screen} from '@testing-library/react-native';
import LoginScreen from '../src/Screens/LoginScreen';

jest.mock('../src/components/auth/EmailSignUp', () => {
  const {Text} = require('react-native');
  return () => <Text>EmailSignup Component</Text>;
});
jest.mock('../src/components/auth/MobileLogIn', () => {
  const {Text} = require('react-native');
  return () => <Text>MobileLogin Component</Text>;
});
jest.mock('../src/components/auth/EmailLogIn', () => {
  const {Text} = require('react-native');
  return () => <Text>EmailLogin Component</Text>;
});
jest.mock('../src/components/ui/ToggleButton', () => {
  const {Text} = require('react-native');
  return () => <Text>Toggle Button Component</Text>;
});
jest.mock('../src/assests/svgs/Carosel.svg', () => {
  const {Text} = require('react-native');
  return () => <Text>Carosel SVG</Text>;
});

describe('LoginScreen - Initial Render Check', () => {
  it('renders all expected elements in the initial (mobile login) state', () => {
    render(<LoginScreen />);

    expect(screen.getByText('Welcome To')).toBeVisible();
    expect(screen.getByText('Mediversal')).toBeVisible();
    expect(screen.getByText('Easy Healthcare, In Your Hands')).toBeVisible();

    expect(screen.getByText('MobileLogin Component')).toBeVisible();
    expect(screen.getByText('Toggle Button Component')).toBeVisible();
    expect(screen.getByText('Carosel SVG')).toBeVisible();

    expect(screen.queryByText('EmailLogin Component')).toBeNull();
    expect(screen.queryByText('EmailSignup Component')).toBeNull();
    expect(screen.queryByText("Don't have an Account?")).toBeNull();
    expect(screen.queryByText('Create One')).toBeNull();
    expect(screen.queryByText('By logging in, you agree to our')).toBeNull();
  });
});
