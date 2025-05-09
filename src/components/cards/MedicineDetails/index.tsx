import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Stethoscope} from 'lucide-react-native';
import {styles} from './index.styles';

interface MedicineDetailProps {
  images: any[];
  rating: number;
  name: string;
  packInfo: string;
  saltComposition: string;
  currentPrice: string;
  originalPrice: string;
  discount: string;
  deliveryTime: string;
}

const MedicineDetail: React.FC<MedicineDetailProps> = ({
  images,
  rating = 4.5,
  name = 'Dolo 650mg Tablet',
  packInfo = 'Strip of 10 Tablets',
  saltComposition = 'Paracetamol (650mg)',
  currentPrice = '₹ 165',
  originalPrice = '₹ 195',
  discount = '15% OFF',
  deliveryTime = 'Get by 9pm, Tomorrow',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push('★');
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push('½');
      } else {
        stars.push('☆');
      }
    }

    return (
      <View style={styles.starsContainer}>
        {stars.map((star, index) => (
          <Text key={index} style={{color: star === '☆' ? '#ccc' : '#FFD700'}}>
            {star}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Auto-scrolling images */}
      <View style={styles.imageContainer}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Image source={item} style={styles.image} />}
          onMomentumScrollEnd={event => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / screenWidth,
            );
            setActiveIndex(index);
          }}
        />
      </View>

      {/* Rating and dot indicators */}
      <View style={styles.ratingContainer}>
        {renderStars()}
        <View style={styles.dotIndicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Medicine name and pack info */}
      <View style={styles.nameContainer}>
        <Text style={styles.medicineName}>{name}</Text>
        <Text style={styles.medicinePack}>{packInfo}</Text>
      </View>

      {/* Salt composition */}
      <Text style={styles.saltLabel}>Salt Composition</Text>
      <Text style={styles.saltComposition}>{saltComposition}</Text>

      {/* Price information */}
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>{currentPrice}</Text>
        <Text style={styles.originalPrice}>{originalPrice}</Text>
        <Text style={styles.discount}>{discount}</Text>
      </View>

      {/* Stock and delivery info */}
      <View style={styles.stockContainer}>
        <Text style={styles.inStock}>In Stock</Text>
        <Text style={styles.deliveryText}>{deliveryTime}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addCartButton}>
          <Text style={styles.buttonText}>Add Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.consultButton}>
          <Stethoscope size={16} color="#0088B1" />
          <Text style={styles.consultButtonText}>Consult</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MedicineDetail;
