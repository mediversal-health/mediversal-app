// /**
//  * What we are testing here:
//  *
//  * This test suite verifies the behavior of the <OrdersScreen /> component.
//  * It includes the following checks:
//  *
//  * 1. Renders basic UI components: header, search input, and status filter chips.
//  * 2. Fetches and displays order details after loading.
//  * 3. Filters orders based on delivery status chip interaction (e.g., COMPLETED, SHIPPED).
//  * 4. Filters orders based on user input in the search bar.
//  * 5. Handles navigation via the back button.
//  *
//  * All API calls, Zustand stores, and navigation hooks are mocked.
//  */

// import React from 'react';
// import {render, waitFor, fireEvent} from '@testing-library/react-native';
// import OrdersScreen from '../src/Screens/OrdersScreen';

// beforeAll(() => {
//   jest.spyOn(console, 'log').mockImplementation(() => {});
//   jest.spyOn(console, 'error').mockImplementation(() => {});
// });

// const mockGoBack = jest.fn();
// jest.mock('@react-navigation/native', () => ({
//   useNavigation: () => ({
//     goBack: mockGoBack,
//   }),
// }));

// jest.mock('../src/store/authStore', () => ({
//   useAuthStore: jest.fn(() => ({
//     customer_id: 'cust123',
//   })),
// }));

// jest.mock('../src/Services/order', () => ({
//   getOrders: jest.fn(() =>
//     Promise.resolve({
//       data: [
//         {
//           customerName: 'John Doe',
//           orderId: '12345',
//           createdAt: '2025-06-25T00:00:00.000Z',
//           items: [{}, {}, {}],
//           TotalOrderAmount: '199.99',
//           deliveryStatus: 'COMPLETED',
//         },
//       ],
//     }),
//   ),
// }));

// describe('OrdersScreen', () => {
//   // it('renders screen with header, search and filter chips', async () => {
//   //   const {getByText, getByPlaceholderText} = render(<OrdersScreen />);
//   //   expect(getByText('My Orders')).toBeTruthy();
//   //   expect(
//   //     getByPlaceholderText('Search for orders, items or services'),
//   //   ).toBeTruthy();
//   //   expect(getByText('COMPLETED')).toBeTruthy();
//   // });

//   // it('displays loading spinner and renders order card after fetch', async () => {
//   //   const {getByText, getAllByText} = render(<OrdersScreen />);

//   //   await waitFor(() => {
//   //     expect(getByText('ORD-12345')).toBeTruthy();
//   //     // expect(getByText('25 Jun 2025')).toBeTruthy();
//   //     expect(getByText('Order Items')).toBeTruthy();
//   //     expect(getAllByText('₹199.99').length).toBeGreaterThan(0);
//   //   });
//   // });

//   it('filters orders by status chip interaction', async () => {
//     const {getByText} = render(<OrdersScreen />);

//     await waitFor(() => {
//       expect(getByText('ORD-12345')).toBeTruthy();
//     });

//     // fireEvent.press(getByText('SHIPPED'));

//     // await waitFor(() => {
//     //   expect(queryByText('ORD-12345')).toBeNull();
//     //   expect(getByText('No orders found.')).toBeTruthy();
//     // });
//   });

//   it('filters orders by search input', async () => {
//     const {getByPlaceholderText, queryByText, getByText} = render(
//       <OrdersScreen />,
//     );

//     await waitFor(() => {
//       expect(getByText('ORD-12345')).toBeTruthy();
//     });

//     const searchInput = getByPlaceholderText('Search for orders');
//     fireEvent.changeText(searchInput, 'wrong-id');

//     await waitFor(() => {
//       expect(queryByText('ORD-12345')).toBeNull();
//       expect(getByText('No orders found.')).toBeTruthy();
//     });
//   });

//   it('navigates back when back button is pressed', () => {
//     const {getByTestId} = render(<OrdersScreen />);
//     const backBtn = getByTestId('back-button');
//     fireEvent.press(backBtn);
//     expect(mockGoBack).toHaveBeenCalled();
//   });
// });
