import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Search, Mic} from 'lucide-react-native';
import {Fonts} from '../../../styles/fonts';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation';

const SearchBar: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('GlobalSearchScreen')}>
        <View style={styles.textWrapper}>
          <Search color={'#0088B1'} size={20} />
          <Text style={styles.placeholderText}>
            Search for <Text style={styles.highlight}>Medicines</Text>
          </Text>
        </View>
        {/* <Mic color={'#0088B1'} /> */}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 10,
  },
  container: {
    backgroundColor: '#e8f4f7',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  placeholderText: {
    color: '#999',
    fontFamily: Fonts.JakartaRegular,
  },
  highlight: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
});

export default SearchBar;
