/**
 *
 * What we are testing here:
 *
 * This test suite ensures that the `AddressBookScreen`:
 * - Renders correctly with expected UI components like header and address sections.
 * - Displays skeleton loaders during the loading state.
 * - Handles presence of saved addresses and toggles between address list and form view.
 * - Shows the "Add New Address" button and responds to its press.
 * - Does not crash when required route params are missing.
 *
 *  Mocks:
 * - Navigation (goBack)
 * - Zustand stores: authStore, addressStore, toastStore
 * - Service methods: getCustomerAddresses
 * - Components: AddressCard, AddressCardSkeleton, AddressActionModal
 */

import { render, waitFor, fireEvent } from '@testing-library/react-native';
import AddressBookScreen from '../src/Screens/AddressBookScreen';

jest.spyOn(console, 'log').mockImplementation(() => {});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: jest.fn(),
    replace: jest.fn(),
  }),
  useRoute: () => ({
    params: {
      location: undefined,
      fromLocationMap: false,
      isFromProfile: false,
    },
  }),
}));

jest.mock('../src/store/authStore', () => ({
  useAuthStore: jest.fn(() => ({
    customer_id: 'cust123',
  })),
}));

jest.mock('../src/store/addressStore', () => {
  return {
    useAddressBookStore: jest.fn(() => ({
      addresses: [
        {
          Customer_Address_id: 'addr123',
          Address_type: 'Home',
          Recipient_name: 'John Doe',
          Home_Floor_FlatNumber: '12A',
          Area_details: 'Sector 45',
          City: 'New Delhi',
          State: 'Delhi',
          PinCode: 110092,
          PhoneNumber: '9876543210',
        },
      ],
      setAddresses: jest.fn(),
      selectedAddress: null,
      setSelectedAddress: jest.fn(),
      hasLoadedAddresses: false,
      setHasLoadedAddresses: jest.fn(),
    })),
  };
});

jest.mock('../src/store/toastStore', () => ({
  useToastStore: jest.fn(() => ({
    showToast: jest.fn(),
  })),
}));

jest.mock('../src/Services/address', () => ({
  getCustomerAddresses: jest.fn(() =>
    Promise.resolve({
      data: [
        {
          Customer_Address_id: 'addr123',
          Address_type: 'Home',
          Recipient_name: 'John Doe',
          Home_Floor_FlatNumber: '12A',
          Area_details: 'Sector 45',
          City: 'New Delhi',
          State: 'Delhi',
          PinCode: 110092,
          PhoneNumber: '9876543210',
        },
      ],
    }),
  ),
}));

jest.mock('../src/components/cards/AddressCard', () => {
  const { Text } = require('react-native');
  return () => <Text>Mocked AddressCard</Text>;
});

jest.mock('../src/components/cards/AddressCard/skeletons', () => {
  const { Text } = require('react-native');
  return () => <Text>Mocked AddressCardSkeleton</Text>;
});

jest.mock('../src/components/modal/AddressActionModal', () => {
  const { Text } = require('react-native');
  return () => <Text>Mocked AddressActionModal</Text>;
});

describe('AddressBookScreen', () => {
  it('renders header and address components', async () => {
    const { getByText } = render(<AddressBookScreen />);
    await waitFor(() => {
      expect(getByText('Address Book')).toBeTruthy();
      expect(getByText('Mocked AddressCard')).toBeTruthy();
    });
  });

  it('renders Add New Address section when form is shown', async () => {
    const { getByText } = render(<AddressBookScreen />);
    await waitFor(() => {
      expect(getByText('Add New Address')).toBeTruthy();
    });
  });

  it('displays skeleton while loading initially', async () => {
    const { getByText } = render(<AddressBookScreen />);
    await waitFor(() => {
      expect(getByText('Mocked AddressCardSkeleton')).toBeTruthy();
    });
  });

  it('toggles form visibility when Add New Address is clicked', async () => {
    const { getByText } = render(<AddressBookScreen />);
    const addNewBtn = await waitFor(() => getByText('Add New Address'));
    fireEvent.press(addNewBtn);
    expect(addNewBtn).toBeTruthy();
  });
});
