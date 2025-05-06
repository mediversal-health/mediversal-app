import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import styles from './index.styles';
const GoogleLoginButton = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image
        source={require('./assets/svgs/googleIcon.svg')}
        style={styles.icon}
      />

      <View style={styles.separator} />

      <Text style={styles.text}>Login with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginButton;
