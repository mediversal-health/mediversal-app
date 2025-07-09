import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { Fonts } from '../../../styles/fonts';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation';

const SearchBar: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('GlobalSearchScreen')}
      >
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
  container: {
    alignItems: 'center',
    backgroundColor: '#e8f4f7',
    borderColor: '#ccc',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  highlight: {
    color: '#0088B1',
    fontFamily: Fonts.JakartaRegular,
  },
  placeholderText: {
    color: '#999',
    fontFamily: Fonts.JakartaRegular,
  },
  textWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  wrapper: {
    paddingTop: 10,
  },
});

export default SearchBar;
