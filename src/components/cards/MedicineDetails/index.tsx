import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  // TouchableOpacity,
  // ActivityIndicator,
} from 'react-native';
// import {MessageCircleMore} from 'lucide-react-native';
import {styles} from './index.styles';
// import {useCartStore} from '../../../store/cartStore';
// import {useAuthStore} from '../../../store/authStore';
import {Fonts} from '../../../styles/fonts';
import {MessageCircleMore} from 'lucide-react-native';
import {useAuthStore} from '../../../store/authStore';
import {useCartStore} from '../../../store/cartStore';

interface MedicineDetailProps {
  images: string[];
  productId: number | undefined;
  rating: number;
  name: string | undefined;
  packInfo: string;
  saltComposition: string | undefined;
  currentPrice: string | undefined;
  originalPrice: string | undefined;
  discount: string;
  deliveryTime: string;
  onAddToCart?: () => void;
  isAddingToCart?: boolean;
  prescriptionRequired: string | undefined;
  StockAvailableInInventory: number | undefined;
}

const MedicineDetail: React.FC<MedicineDetailProps> = ({
  images = [],
  productId,
  rating = 4.5,
  name = 'Dolo 650mg Tablet',
  packInfo = 'Strip of 10 Tablets',
  saltComposition = 'Paracetamol (650mg)',
  currentPrice = '₹ 165',
  originalPrice = '₹ 195',
  discount = '15% OFF',
  deliveryTime = 'Get by 9pm, Tomorrow',
  onAddToCart,
  isAddingToCart = false,
  prescriptionRequired,
  StockAvailableInInventory,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get('window').width;
  const customer_id = useAuthStore(state => state.customer_id);
  const quantity = useCartStore(state =>
    state.getProductQuantity(customer_id?.toString() ?? '', productId ?? 0),
  );

  const isInCart = quantity > 0;
  console.log(StockAvailableInInventory);
  const isOutOfStock =
    StockAvailableInInventory === 0 || StockAvailableInInventory == null;
  console.log(isOutOfStock);
  // Safe image handling
  const safeImages = Array.isArray(images) ? images.filter(img => img) : [];
  const hasMultipleImages = safeImages.length > 1;
  const getDeliveryDate = (daysToAdd: number) => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);

    // Format as "Day, DD Month" (e.g., "Fri, 14 Jun")
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };
  useEffect(() => {
    if (!hasMultipleImages) {
      return;
    }

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % safeImages.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, safeImages.length, hasMultipleImages]);

  const handleScrollEnd = (event: any) => {
    if (safeImages.length === 0) {
      return;
    }

    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / screenWidth);

    if (newIndex >= 0 && newIndex < safeImages.length) {
      setActiveIndex(newIndex);
    }
  };

  const renderImageItem = ({item}: {item: string}) => (
    <Image
      source={typeof item === 'string' ? {uri: item} : item}
      style={[styles.image, {width: screenWidth, height: 300}]}
      resizeMode="contain"
      onError={() => console.log('Image failed to load')}
    />
  );

  const renderImageSection = () => {
    if (safeImages.length === 0) {
      return (
        <View style={[styles.imageContainer, styles.emptyImageContainer]}>
          <Text style={styles.emptyImageText}>No images available</Text>
        </View>
      );
    }

    return (
      <View style={styles.imageContainer}>
        <FlatList
          ref={flatListRef}
          data={safeImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderImageItem}
          onMomentumScrollEnd={handleScrollEnd}
          getItemLayout={(_, index) => ({
            length: screenWidth,
            offset: screenWidth * index,
            index,
          })}
          onScrollToIndexFailed={({index}) => {
            flatListRef.current?.scrollToOffset({
              offset: index * screenWidth,
              animated: false,
            });
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({index, animated: false});
            }, 100);
          }}
        />
      </View>
    );
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }

    return (
      <View style={styles.starsContainer}>
        {stars.map((star, index) => (
          <Text
            key={index}
            style={{color: star === '☆' ? '#B0B6B8' : '#0088B1'}}>
            {star}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Image Section */}
      {renderImageSection()}
      {prescriptionRequired == 'Yes' && (
        <View
          style={{
            backgroundColor: '#EB5757',
            width: 130,
            paddingVertical: 10,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: Fonts.JakartaRegular,
              color: '#FFF',
            }}>
            {' '}
            Prescription Required
          </Text>
        </View>
      )}
      {/* Rating and dot indicators */}
      <View style={styles.ratingContainer}>
        {renderStars()}
        {hasMultipleImages && (
          <View style={styles.dotIndicatorContainer}>
            {safeImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === activeIndex ? styles.activeDot : null,
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Medicine name and pack info */}
      {name != '' && (
        <View style={styles.nameContainer}>
          <Text style={styles.medicineName}>{name}</Text>
          <Text style={styles.medicinePack}>{packInfo}</Text>
        </View>
      )}
      {/* Salt composition */}
      {saltComposition != ' ' && (
        <>
          <Text style={styles.saltLabel}>Salt Composition</Text>
          <Text style={styles.saltComposition}>{saltComposition}</Text>
        </>
      )}
      {/* Price information */}
      <View style={styles.priceContainer}>
        <Text style={styles.currentPrice}>{currentPrice}</Text>
        <Text style={styles.originalPrice}>{originalPrice}</Text>
        <Text style={styles.discount}>
          {(() => {
            const orig = Number((originalPrice || '').replace(/[^\d.]/g, ''));
            const curr = Number((currentPrice || '').replace(/[^\d.]/g, ''));
            console.log(orig, curr);
            // Check if prices are valid numbers and original price is greater than 0
            if (
              !isNaN(orig) &&
              !isNaN(curr) &&
              orig > 0 &&
              curr > 0 &&
              orig > curr
            ) {
              const discountPercent = Math.round(((orig - curr) / orig) * 100);
              return `${discountPercent}% off`;
            }
            return discount; // Return null if discount can't be calculated
          })()}
        </Text>
      </View>

      {/* Stock and delivery info */}
      <View style={styles.stockContainer}>
        <Text style={[styles.inStock, isOutOfStock && styles.outOfStock]}>
          {isOutOfStock ? 'Out of Stock' : 'In Stock'}
        </Text>
        {!isOutOfStock && (
          <Text style={styles.deliveryText}>{`Delivery by ${getDeliveryDate(
            3,
          )}`}</Text>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.addCartButton,
            (isAddingToCart || isInCart || isOutOfStock) &&
              styles.disabledButton,
          ]}
          onPress={onAddToCart}
          disabled={isAddingToCart || isInCart || isOutOfStock}>
          {isAddingToCart ? (
            <ActivityIndicator size="small" color="#0088B1" />
          ) : isInCart ? (
            <Text style={styles.buttonText}>Already in Cart</Text>
          ) : (
            <Text style={styles.buttonText}>Add Cart</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.consultButton}>
          <MessageCircleMore size={16} color="#0088B1" />
          <Text style={styles.consultButtonText}>Consult</Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </View>
  );
};

export default MedicineDetail;
