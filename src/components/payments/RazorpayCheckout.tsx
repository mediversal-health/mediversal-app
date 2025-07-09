import RazorpayCheckout from 'react-native-razorpay';

export const openRazorpayCheckout = () => {
  const options = {
    description: 'Test Payment',
    image: 'https://your-logo-url.com/logo.png',
    currency: 'INR',
    key: 'rzp_test_OV61ulB5B7xMPp', // TEST KEY ID
    amount: '5000', // amount in paise (i.e., ₹50)
    name: 'Mediversal',
    prefill: {
      email: 'sushantbibhu@gmail.com',
      contact: '9565441245',
      name: 'Sushant',
    },
    theme: { color: '#F37254' },
  };

  RazorpayCheckout.open(options)
    .then((data) => {
      console.log(`Success: ${JSON.stringify(data)}`);
    })
    .catch((error) => {
      console.log(`Error: ${JSON.stringify(error)}`);
      console.log(error.stack); // Check for stack trace
    });
};
