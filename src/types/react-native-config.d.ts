declare module 'react-native-config' {
  interface Env {
    RAPID_SHYP_ACCESS_TOKEN: string;
    RAPID_SHYP_API_URL: string;
    RAZORPAY_KEY: string;
  }
  const Config: Env;
  export default Config;
}
