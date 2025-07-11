import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Animated,
} from 'react-native';
import useProductStore from '../../../store/productsStore';
import styles from './index.styles';
import {ProductCardProps} from '../../../types';
import {useFilterStore} from '../../../store/filterStore';
import Modal from 'react-native-modal';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filtered: ProductCardProps['product'][]) => void;
  selectedFilters: {[key: string]: boolean};
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{[key: string]: boolean}>
  >;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  priceRange: {min: string; max: string};
  setPriceRange: React.Dispatch<
    React.SetStateAction<{min: string; max: string}>
  >;
}
interface CategoryOption {
  key: string;
  label: string;
}

// interface SelectedFilters {
//   [key: string]: boolean;
// }

type SidebarItem =
  | 'Category'
  | 'Salt Name'
  | 'Manufacturer'
  | 'Price Range'
  | 'Availability'
  | 'Prescription Required'
  | 'Special Tags';

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  onClose,
  onApply,
  selectedFilters,
  setSelectedFilters,
  searchText,
  setSearchText,
  priceRange,
  setPriceRange,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<SidebarItem>('Salt Name');
  // const [searchText, setSearchText] = useState<string>('');
  // const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  // const [priceRange, setPriceRange] = useState({min: '', max: ''});

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const {originalProducts} = useProductStore();
  const {filteredProducts} = useFilterStore();

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  const sidebarItems: SidebarItem[] = [
    // 'Category',
    'Salt Name',
    'Manufacturer',
    // 'Price Range',
    'Availability',
    'Prescription Required',
    // 'Special Tags',
  ];

  const optionsData = {
    // Category: [
    //   {key: 'ayurveda', label: 'Ayurveda'},
    //   {key: 'acupuncture', label: 'Acupuncture'},
    //   {key: 'homeopathy', label: 'Homeopathy'},
    //   {key: 'chiropractic', label: 'Chiropractic'},
    //   {key: 'naturopathy', label: 'Naturopathy'},
    //   {key: 'reiki', label: 'Reiki'},
    //   {key: 'massageTherapy', label: 'Massage Therapy'},
    // ],
    'Salt Name': [
      {key: 'paracetamol', label: 'Paracetamol'},
      {key: 'ibuprofen', label: 'Ibuprofen'},
      {key: 'aspirin', label: 'Aspirin'},
      {key: 'naproxen', label: 'Naproxen'},
      {key: 'acetaminophen', label: 'Acetaminophen'},
      {key: 'diclofenac', label: 'Diclofenac'},
      {key: 'celecoxib', label: 'Celecoxib'},
      {key: 'meloxicam', label: 'Meloxicam'},
      {key: 'ketoprofen', label: 'Ketoprofen'},
      {key: 'indomethacin', label: 'Indomethacin'},
      {key: 'morphine', label: 'Morphine'},
      {key: 'oxycodone', label: 'Oxycodone'},
      {key: 'hydrocodone', label: 'Hydrocodone'},
      {key: 'fentanyl', label: 'Fentanyl'},
      {key: 'tramadol', label: 'Tramadol'},
    ],
    Manufacturer: [
      {key: 'cipla', label: 'Cipla'},
      {key: 'sunPharma', label: 'Sun Pharmaceutical'},
      {key: 'drReddys', label: "DrReddy's Laboratories Ltd"},
      {key: 'lupin', label: 'Lupin Pharmaceuticals'},
      {key: 'aurobindo', label: 'Aurobindo Pharma'},
      {key: 'glenmark', label: 'Glenmark Pharmaceuticals'},
      {key: 'torrent', label: 'Torrent Pharmaceuticals'},
      {key: 'cadila', label: 'Zydus Cadila'},
      {key: 'alkem', label: 'Alkem Laboratories'},
      {key: 'biocon', label: 'Biocon'},
      {key: 'roche', label: 'Roche Products India Pvt Ltd'},
    ],
    Availability: [
      {key: 'inStock', label: 'In Stock'},
      {key: 'outOfStock', label: 'Out of Stock'},
    ],
    'Prescription Required': [
      {key: 'prescriptionRequired', label: 'Prescription Required'},
      {key: 'noPrescriptionRequired', label: 'No Prescription Required'},
    ],
    // 'Special Tags': [
    //   {key: 'sugarFree', label: 'Sugar - Free'},
    //   {key: 'vegetarian', label: 'Vegetarian'},
    //   {key: 'lactoseFree', label: 'Lactose - Free'},
    //   {key: 'glutenFree', label: 'Gluten - Free'},
    // ],
  };

  const toggleFilter = (key: string): void => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const hasActiveFilters = (): boolean => {
    return (
      Object.values(selectedFilters).some(filter => filter) ||
      searchText.trim() !== '' ||
      priceRange.min !== '' ||
      priceRange.max !== ''
    );
  };

  const convertToCardProduct = (product: any): ProductCardProps['product'] => {
    return {
      id: product.productId.toString(),
      name: product.ProductName,
      description: product.ProductInformation || 'No description available',
      quantity: `Available: ${product.StockAvailableInInventory}`,
      delivery: 'Delivery in 2-3 days',
      originalPrice: parseFloat(product.SellingPrice),
      discountedPrice: parseFloat(product.DiscountedPrice),
      discountPercentage: parseFloat(product.DiscountedPercentage),
      Category: String(product.Category || ''),
      image: product.images?.[0] || '',
    };
  };

  const applyFilters = () => {
    let productsToFilter = originalProducts;

    if (filteredProducts && filteredProducts.length > 0) {
      const filteredIds = filteredProducts.map(product => product.id);
      productsToFilter = originalProducts.filter(product =>
        filteredIds.includes(product.productId.toString()),
      );
    }

    const activeFilters = Object.keys(selectedFilters).filter(
      key => selectedFilters[key],
    );

    if (activeFilters.length > 0) {
      productsToFilter = productsToFilter.filter(product => {
        if (selectedCategory === 'Category') {
          return activeFilters.some(filter =>
            String(product.Category)
              .toLowerCase()
              .includes(filter.toLowerCase()),
          );
        }

        if (selectedCategory === 'Salt Name') {
          return activeFilters.some(filter =>
            product.Composition?.toLowerCase().includes(filter.toLowerCase()),
          );
        }

        if (selectedCategory === 'Manufacturer') {
          return activeFilters.some(filter => {
            const manufacturerName =
              product.ManufacturerName?.toLowerCase() || '';
            return (
              manufacturerName.includes(filter.toLowerCase()) ||
              manufacturerName.includes(
                optionsData.Manufacturer.find(
                  m => m.key === filter,
                )?.label.toLowerCase() || '',
              )
            );
          });
        }

        if (selectedCategory === 'Availability') {
          const stockAvailable =
            parseInt(String(product.StockAvailableInInventory), 10) || 0;
          if (activeFilters.includes('inStock')) {
            return stockAvailable > 0;
          }
          if (activeFilters.includes('outOfStock')) {
            return stockAvailable === 0;
          }
        }

        if (selectedCategory === 'Prescription Required') {
          const isPrescriptionRequired =
            product.PrescriptionRequired === 'true' ||
            product.Category === 'PRESCRIPTION (Rx)';
          if (activeFilters.includes('prescriptionRequired')) {
            return isPrescriptionRequired;
          }
          if (activeFilters.includes('noPrescriptionRequired')) {
            return !isPrescriptionRequired;
          }
        }

        // // Special Tags filters (you might need to adjust based on your product structure)
        // if (selectedCategory === 'Special Tags') {
        //   // This would depend on how special tags are stored in your product data
        //   // For now, we'll assume they're in a tags field or similar
        //   const productTags = product.Tags?.toLowerCase() || product.escription?.toLowerCase() || '';
        //   return activeFilters.some(filter => {
        //     switch(filter) {
        //       case 'sugarFree':
        //         return productTags.includes('sugar free') || productTags.includes('sugar-free');
        //       case 'vegetarian':
        //         return productTags.includes('vegetarian') || productTags.includes('veg');
        //       case 'lactoseFree':
        //         return productTags.includes('lactose free') || productTags.includes('lactose-free');
        //       case 'glutenFree':
        //         return productTags.includes('gluten free') || productTags.includes('gluten-free');
        //       default:
        //         return false;
        //     }
        //   });
        // }

        return true;
      });
    }

    if (priceRange.min !== '' || priceRange.max !== '') {
      productsToFilter = productsToFilter.filter(product => {
        const price = parseFloat(product.DiscountedPrice);
        const minPrice = priceRange.min !== '' ? parseFloat(priceRange.min) : 0;
        const maxPrice =
          priceRange.max !== '' ? parseFloat(priceRange.max) : Infinity;

        return price >= minPrice && price <= maxPrice;
      });
    }

    if (searchText.trim() !== '') {
      productsToFilter = productsToFilter.filter(
        product =>
          product.ProductName?.toLowerCase().includes(
            searchText.toLowerCase(),
          ) ||
          product.ProductInformation?.toLowerCase().includes(
            searchText.toLowerCase(),
          ) ||
          product.Composition?.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    const cardFiltered = productsToFilter.map(convertToCardProduct);

    // console.log('Filtered Products Count:', cardFiltered.length);
    // console.log('Applied Filters:', selectedFilters);
    // console.log('Price Range:', priceRange);
    // console.log('Search Text:', searchText);

    onApply(cardFiltered);
    onClose();
  };

  const clearFilters = (): void => {
    setSelectedFilters({});
    setSearchText('');
    setPriceRange({min: '', max: ''});
  };
  const renderSearchableContent = (options: CategoryOption[]) => (
    <View style={styles.contentContainer}>
      <ScrollView
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}>
        {options
          .filter(option =>
            option.label.toLowerCase().includes(searchText.toLowerCase()),
          )
          .map((option: CategoryOption) => (
            <TouchableOpacity
              key={option.key}
              style={styles.optionRow}
              onPress={() => toggleFilter(option.key)}>
              <Text style={styles.optionText}>{option.label}</Text>
              <View
                style={[
                  styles.checkbox,
                  selectedFilters[option.key] && styles.checkboxSelected,
                ]}>
                {selectedFilters[option.key] && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );

  const renderContent = () => {
    const currentOptions =
      optionsData[selectedCategory as keyof typeof optionsData];

    if (currentOptions) {
      return renderSearchableContent(currentOptions);
    }

    if (selectedCategory === 'Price Range') {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.priceInputContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={priceRange.min}
              onChangeText={text =>
                setPriceRange(prev => ({...prev, min: text}))
              }
            />
            <Text style={styles.priceSeparator}>-</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Max"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={priceRange.max}
              onChangeText={text =>
                setPriceRange(prev => ({...prev, max: text}))
              }
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentSubtitle}>
          Content for {selectedCategory} will be displayed here.
        </Text>
      </View>
    );
  };

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filters</Text>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.sidebar}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {sidebarItems.map((item: SidebarItem) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.sidebarItem,
                      selectedCategory === item && styles.sidebarItemActive,
                    ]}
                    onPress={() => setSelectedCategory(item)}>
                    <Text
                      style={[
                        styles.sidebarText,
                        selectedCategory === item && styles.sidebarTextActive,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.contentArea}>{renderContent()}</View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.applyButton,
                !hasActiveFilters() && styles.applyButtonDisabled,
              ]}
              disabled={!hasActiveFilters()}
              onPress={applyFilters}>
              <Text
                style={[
                  styles.applyButtonText,
                  !hasActiveFilters() && styles.applyButtonTextDisabled,
                ]}>
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterBottomSheet;
