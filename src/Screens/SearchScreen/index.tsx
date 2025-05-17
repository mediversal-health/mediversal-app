/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {ChevronLeft, MapPinned, Search} from 'lucide-react-native';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import styles from './index.styles';
import {GOOGLE_API_KEY} from '@env';
interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PlaceAutocompleteResponse {
  predictions: PlacePrediction[];
  status: string;
}

export default function SearchScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPlaces = async (text: string): Promise<void> => {
    if (text.length > 1) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            text,
          )}&key=${GOOGLE_API_KEY}&types=geocode`,
        );
        const data: PlaceAutocompleteResponse = await response.json();
        if (data.predictions) {
          setSuggestions(data.predictions);
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (text: string): void => {
    setSearchText(text);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchPlaces(text);
    }, 300);
  };

  const handleSelectPlace = (place: PlacePrediction): void => {
    setSearchText(place.description);
    setSuggestions([]);
  };

  const renderSuggestion = ({
    item,
  }: {
    item: PlacePrediction;
  }): React.ReactElement => (
    <TouchableOpacity
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
      }}
      onPress={() => handleSelectPlace(item)}>
      <Text style={{fontSize: 14}}>{item.description}</Text>
    </TouchableOpacity>
  );

  const handleUseCurrentLocation = (): void => {
    console.log('Use current location pressed');
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
      }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={20} color="#0088B1" />
        </TouchableOpacity>

        <Text style={{fontSize: 16, marginLeft: 10}}>
          Select Delivery Location
        </Text>
      </View>

      <View style={{paddingHorizontal: 16, marginBottom: 8}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E8F4F7',
            borderRadius: 8,
            paddingHorizontal: 12,
            height: 44,
            marginTop: 10,
          }}>
          <Search size={20} color="#999" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 14,
              color: '#333',
            }}
            placeholder="Search for building, society, location..."
            value={searchText}
            onChangeText={handleSearch}
            autoFocus
          />
          {isLoading && <ActivityIndicator size="small" color="#0088B1" />}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#B0B6B8',
          padding: 15,
          marginHorizontal: 20,
        }}>
        <MapPinned color={'#0088B1'} size={20} />
        <TouchableOpacity onPress={handleUseCurrentLocation}>
          <Text style={{color: '#0088B1', fontSize: 14}}>
            Use current Location
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={item => item.place_id}
        style={{flex: 1}}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}
