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

  selectedCategory: string;
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

  selectedCategory,
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
    // For prescription required, ensure only one option is selected at a time
    if (currentSelectedCategory === 'Prescription Required') {
      const newFilters: {[key: string]: boolean} = {};
      Object.keys(selectedFilters).forEach(filterKey => {
        if (
          filterKey.startsWith('prescription') ||
          filterKey.startsWith('noPrescription')
        ) {
          newFilters[filterKey] = false;
        }
      });
      setSelectedFilters({
        ...newFilters,
        [key]: !selectedFilters[key],
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

    let categoryFiltered = cardProducts;

    if (selectedCategory !== 'All') {
      categoryFiltered = cardProducts.filter(
        product => product.Category === selectedCategory,
      );
    }

    const cardFiltered = categoryFiltered;
    onApply(cardFiltered); // pass category-only filtered products

    onClose();
  };

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
            {currentSelectedCategory === 'Prescription Required' ? (
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
