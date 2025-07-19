import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import useProductStore from '../../../store/productsStore';
import styles from './index.styles';
import {ProductCardProps} from '../../../types';
import {useFilterStore} from '../../../store/filterStore';
import Modal from 'react-native-modal';
import {filterProducts} from '../../../utils/functions';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filtered: ProductCardProps['product'][]) => void;
  selectedFilters: {[key: string]: boolean};
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{[key: string]: boolean}>
  >;
  // priceRange: {min: number; max: number};
  // setPriceRange: React.Dispatch<
  //   React.SetStateAction<{min: number; max: number}>
  // >;
  selectedCategory: string;
  onCategoryReset: () => void;
}

interface CategoryOption {
  key: string;
  label: string;
}

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
  // priceRange,
  // setPriceRange,
  selectedCategory,
  onCategoryReset,
}) => {
  const [currentSelectedCategory, setCurrentSelectedCategory] =
    useState<SidebarItem>('Salt Name');
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const {cardProducts} = useProductStore();
  const resetFilters = useFilterStore(state => state.resetFilters);

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  const sidebarItems: SidebarItem[] = [
    'Salt Name',
    'Manufacturer',
    'Availability',

    'Prescription Required',
  ];

  // const minPrice = Math.min(...cardProducts.map(p => p.sellingPrice));
  // const maxPrice = Math.max(...cardProducts.map(p => p.sellingPrice));

  const optionsData = {
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
  };

  const toggleFilter = (key: string): void => {
    if (
      currentSelectedCategory === 'Availability' ||
      currentSelectedCategory === 'Prescription Required'
    ) {
      const newFilters: {[key: string]: boolean} = {};

      optionsData[currentSelectedCategory].forEach(option => {
        newFilters[option.key] = false;
      });

      newFilters[key] = !selectedFilters[key];
      setSelectedFilters({
        ...selectedFilters,
        ...newFilters,
      });
    } else {
      setSelectedFilters(prev => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const hasActiveFilters = (): boolean => {
    return Object.values(selectedFilters).some(filter => filter);
    // priceRange.min !== minPrice ||
    // priceRange.max !== maxPrice
  };

  const applyFilters = () => {
    const filtered = filterProducts(
      cardProducts,
      selectedCategory,
      selectedFilters,
    );
    onApply(filtered);
  };

  const clearFilters = (): void => {
    setSelectedFilters({});

    resetFilters();

    // Call the category reset callback
    onCategoryReset();

    // Apply the reset (show all products)
    onApply(cardProducts);
    onClose();
  };

  // const renderPriceRange = () => (
  //   <View style={styles.contentContainer}>
  //     <View style={styles.priceRangeContainer}>
  //       <Text style={styles.priceRangeText}>
  //         Price Range: ₹{priceRange.min.toFixed(2)} - ₹
  //         {priceRange.max.toFixed(2)}
  //       </Text>
  //       <Slider
  //         style={styles.slider}
  //         minimumValue={minPrice}
  //         maximumValue={maxPrice}
  //         step={1}
  //         minimumTrackTintColor="#2D9CDB"
  //         maximumTrackTintColor="#d3d3d3"
  //         thumbTintColor="#2D9CDB"
  //         value={priceRange.max}
  //         onValueChange={(value: any) =>
  //           setPriceRange(prev => ({...prev, max: value}))
  //         }
  //       />
  //       <View style={styles.priceInputsContainer}>
  //         <View style={styles.priceInput}>
  //           <Text style={styles.priceLabel}>Min:</Text>
  //           <Text style={styles.priceValue}>₹{priceRange.min.toFixed(2)}</Text>
  //         </View>
  //         <View style={styles.priceInput}>
  //           <Text style={styles.priceLabel}>Max:</Text>
  //           <Text style={styles.priceValue}>₹{priceRange.max.toFixed(2)}</Text>
  //         </View>
  //       </View>
  //     </View>
  //   </View>
  // );

  const renderSearchableContent = (options: CategoryOption[]) => (
    <View style={styles.contentContainer}>
      <ScrollView
        style={styles.optionsContainer}
        showsVerticalScrollIndicator={false}>
        {options.map((option: CategoryOption) => (
          <TouchableOpacity
            key={option.key}
            style={styles.optionRow}
            onPress={() => toggleFilter(option.key)}>
            <Text style={styles.optionText}>{option.label}</Text>
            {currentSelectedCategory === 'Prescription Required' ||
            currentSelectedCategory === 'Availability' ? (
              <View
                style={[
                  styles.radio,
                  selectedFilters[option.key] && styles.radioSelected,
                ]}>
                {selectedFilters[option.key] && (
                  <View style={styles.radioInner} />
                )}
              </View>
            ) : (
              <View
                style={[
                  styles.checkbox,
                  selectedFilters[option.key] && styles.checkboxSelected,
                ]}>
                {selectedFilters[option.key] && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderContent = () => {
    // if (currentSelectedCategory === 'Price Range') {
    //   return renderPriceRange();
    // }

    const currentOptions =
      optionsData[currentSelectedCategory as keyof typeof optionsData];

    if (currentOptions) {
      return renderSearchableContent(currentOptions);
    }

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentSubtitle}>
          Content for {currentSelectedCategory} will be displayed here.
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
                      currentSelectedCategory === item &&
                        styles.sidebarItemActive,
                    ]}
                    onPress={() => setCurrentSelectedCategory(item)}>
                    <Text
                      style={[
                        styles.sidebarText,
                        currentSelectedCategory === item &&
                          styles.sidebarTextActive,
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
              onPress={() => {
                applyFilters();
                onClose();
              }}>
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
