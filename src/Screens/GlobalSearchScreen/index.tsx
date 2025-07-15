/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CartIconWithBadge from '../../components/ui/CartIconWithBadge';
import {ChevronLeft, Search, X} from 'lucide-react-native';
import styles from './index.styles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation';
import PriscriptionSVG from '../HomeScreen/assets/svgs/priscription-icon.svg';
import useProductStore from '../../store/productsStore';
import useRecentSearchStore from '../../store/recentSearchStore';
import {Product} from '../../types';
import OrderNowCard from '../../components/cards/OrderCard';
import CategoryCard from '../../components/cards/CategoryCard';
import {Fonts} from '../../styles/fonts';
import Sneezing from '../PharmacyScreen/assests/svgs/Sneezing.svg';
import Acitdity from '../PharmacyScreen/assests/svgs/Gastric.svg';
import Headache from '../PharmacyScreen/assests/svgs/Dizzy.svg';
import MuscleCramps from '../PharmacyScreen/assests/svgs/Muscle cramps.svg';
import Dehydration from '../PharmacyScreen/assests/svgs/Dehydration.svg';
import Burn from '../PharmacyScreen/assests/svgs/Burn.svg';
import BlockedNose from '../PharmacyScreen/assests/svgs/Burn.svg';
import JointPain from '../PharmacyScreen/assests/svgs/Pain in joints.svg';
import {useAuthStore} from '../../store/authStore';

const GlobalSearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const {originalProducts, getOriginalProduct} = useProductStore();
  const customerId = useAuthStore(state => state.customer_id);
  const {searches, addSearch, clearSearches, removeSearch, hydrate} =
    useRecentSearchStore();

  // Hydrate recent searches for current customer
  useEffect(() => {
    if (customerId) {
      hydrate(customerId.toString());
    }
  }, [customerId, hydrate]);

  // Get last 5 searches
  const lastFiveSearches = searches.slice(0, 5);

  const searchProducts = React.useCallback(
    (term: string) => {
      if (!term.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      const lowerCaseTerm = term.toLowerCase();

      const results = originalProducts.filter(product => {
        return (
          product.ProductName.toLowerCase().startsWith(lowerCaseTerm) ||
          (product.Composition &&
            product.Composition.toLowerCase().startsWith(lowerCaseTerm)) ||
          (product.ManufacturerName &&
            product.ManufacturerName.toLowerCase().startsWith(lowerCaseTerm))
        );
      });

      setSearchResults(results);
      setIsSearching(false);
    },
    [originalProducts],
  );

  useEffect(() => {
    searchProducts(searchTerm);
  }, [searchTerm, searchProducts]);

  const handleSearchSubmit = () => {
    if (searchTerm.trim() && customerId) {
      addSearch(searchTerm, customerId.toString());
    }
  };

  const handleRecentSearchPress = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleProductPress = (itemId: number) => {
    const originalProduct = getOriginalProduct(itemId.toString());
    if (originalProduct && customerId) {
      addSearch(originalProduct.ProductName, customerId.toString());
    }
    navigation.navigate('UploadScreen', {
      product: originalProduct,
    });
  };

  const renderSearchItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => handleProductPress(item.productId)}>
      <Image
        source={{uri: item.images?.[0]}}
        style={styles.searchItemImage}
        resizeMode="contain"
      />
      <View style={styles.searchItemTextContainer}>
        <Text style={styles.searchItemName}>{item.ProductName}</Text>
        {item.ManufacturerName && (
          <Text style={styles.searchItemtManufacturer}>
            {item.ManufacturerName}
          </Text>
        )}
        {item.Composition && (
          <Text style={styles.searchItemSalt}>{item.Composition}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearchItem = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => (
    <View style={styles.recentSearchItem}>
      <TouchableOpacity
        style={styles.recentSearchTextWrapper}
        onPress={() => handleRecentSearchPress(item)}>
        <View style={{backgroundColor: '#D3D7D8', padding: 3, borderRadius: 5}}>
          <Search color="#999" size={16} />
        </View>
        <Text style={styles.recentSearchText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          customerId && removeSearch(index, customerId.toString())
        }>
        <X color="#999" size={16} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} edges={['top']}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: Platform.OS === 'android' ? 10 : 0,
          //paddingBottom: 10,
        }}>
        <View style={styles.headerWrapper}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <ChevronLeft size={20} color="#0088B1" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}} />
        <CartIconWithBadge />
      </View>

      <View style={{paddingHorizontal: 20, marginBottom: 5, flex: 1}}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View style={styles.textWrapper}>
              <Search color={'#899193'} size={20} strokeWidth={1.5} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for Medicines"
                placeholderTextColor="#999"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onSubmitEditing={handleSearchSubmit}
                autoFocus
                returnKeyType="search"
              />
              {searchTerm ? (
                <TouchableOpacity onPress={clearSearch}>
                  <X color={'#0088B1'} size={20} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>

        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0088B1" />
          </View>
        ) : searchTerm ? (
          <FlatList
            data={searchResults}
            renderItem={renderSearchItem}
            keyExtractor={item => item.productId.toString()}
            contentContainerStyle={styles.searchResultsContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={<Text>No products found</Text>}
          />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.priscriptionContainer}>
              <PriscriptionSVG width={25} height={32} strokeWidth={2} />
              <Text style={styles.priscriptionText}>
                Have a Doctor's Prescription?
              </Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => navigation.navigate('UploadPrescription')}>
                <Text style={styles.uploadButtonText}>Upload Now</Text>
              </TouchableOpacity>
            </View>

            {lastFiveSearches.length > 0 && (
              <View style={styles.recentSearchesContainer}>
                <View style={styles.recentSearchesHeader}>
                  <Text style={styles.recentSearchesTitle}>
                    Recent Searches
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      customerId && clearSearches(customerId.toString())
                    }>
                    <Text style={styles.clearButton}>Clear All</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={lastFiveSearches}
                  renderItem={renderRecentSearchItem}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={false}
                  contentContainerStyle={{paddingBottom: 20}}
                />
              </View>
            )}

            <OrderNowCard />

            <View style={{marginTop: 10}}>
              <Text
                style={{
                  fontFamily: Fonts.JakartaRegular,
                  fontSize: 12,
                  marginLeft: 10,
                }}>
                Browse by Category
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  gap: 5,
                  marginTop: 10,
                  marginHorizontal: Platform.OS === 'android' ? 0 : 10,
                  justifyContent: 'space-between',
                }}>
                <CategoryCard
                  SvgImage={Sneezing}
                  title="Cold & Cough"
                  placement="bottom"
                  onPress={() =>
                    navigation.navigate('CategoryFilterScreen', {
                      subCategory_name: 'Cold & Cough',
                      svgImage: Sneezing,
                    })
                  }
                />
                <CategoryCard
                  SvgImage={Acitdity}
                  title="Acidity"
                  placement="center"
                  onPress={() =>
                    navigation.navigate('CategoryFilterScreen', {
                      subCategory_name: 'Acidity',
                      svgImage: Acitdity,
                    })
                  }
                />
                <CategoryCard
                  SvgImage={Headache}
                  title="Headache"
                  placement="bottom"
                  onPress={() =>
                    navigation.navigate('CategoryFilterScreen', {
                      subCategory_name: 'Headache',
                      svgImage: Headache,
                    })
                  }
                />
                <CategoryCard
                  SvgImage={MuscleCramps}
                  title="Muscle Cramps"
                  placement="top"
                  onPress={() =>
                    navigation.navigate('CategoryFilterScreen', {
                      subCategory_name: 'Muscle Cramps',
                      svgImage: MuscleCramps,
                    })
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  gap: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  marginHorizontal: Platform.OS === 'android' ? 0 : 10,
                  justifyContent: 'space-between',
                }}>
                <CategoryCard
                  SvgImage={Dehydration}
                  title="Dehydration"
                  placement="bottom"
                  onPress={() =>
                    navigation.navigate('CategoryFilterScreen', {
                      subCategory_name: 'Dehydration',
                      svgImage: Dehydration,
                    })
                  }
                />
                <CategoryCard
                  SvgImage={Burn}
                  title="Burn Care"
                  placement="bottom"
                  onPress={() =>
                    navigation.navigate('CategoryFilterScreen', {
                      subCategory_name: 'Burn Care',
                      svgImage: Burn,
                    })
                  }
                />
                <CategoryCard
                  SvgImage={BlockedNose}
                  title="Blocked Nose"
                  placement="bottom"
                  onPress={() =>
                    navigation.navigate('CategoryFilterScreen', {
                      subCategory_name: 'Blocked Nose',
                      svgImage: BlockedNose,
                    })
                  }
                />
                <CategoryCard
                  SvgImage={JointPain}
                  title="Joint Pain"
                  placement="bottom"
                  onPress={() =>
                    navigation.navigate('CategoryFilterScreen', {
                      subCategory_name: 'Joint Pain',
                      svgImage: JointPain,
                    })
                  }
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default GlobalSearchScreen;
