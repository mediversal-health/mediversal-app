import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Star} from 'lucide-react-native';
import styles from './index.style';

const {width, height} = Dimensions.get('window');

const images = [require('./assets/med.svg')];

const MedicineDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.imageWrapper}>
        <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          data={images}
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <Image source={item} style={styles.image} resizeMode="cover" />
          )}
        />

        <View style={styles.ratingContainer}>
          <View style={styles.starContainer}>
            <Star size={18} color="gold" />
            <Text style={styles.ratingText}>4.3</Text>
          </View>

          <View style={styles.dotContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.medicineName}>Dolo 650mg Tablet</Text>
        <Text style={styles.stripText}>(Strip of 10 Tablets)</Text>

        <Text style={styles.sectionTitle}>Salt Composition</Text>
        <Text style={styles.saltText}>Paracetamol (650mg)</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹165</Text>
          <Text style={styles.originalPrice}>₹195</Text>
          <Text style={styles.discount}>15% OFF</Text>
        </View>

        <View style={styles.availabilityContainer}>
          <Text style={styles.inStock}>In Stock</Text>
          <Text style={styles.delivery}>Get by 9pm, Tomorrow</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MedicineDetail;
