/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Trash2, SquareMinus, SquarePlus} from 'lucide-react-native';
import {styles} from './index.styles';
import {useCartStore} from '../../../store/cartStore';
import {DeleteFromCart} from '../../../Services/cart';
import {useAuthStore} from '../../../store/authStore';
import useProductStore from '../../../store/productsStore';
import {useCouponStore} from '../../../store/couponStore';
import {useToastStore} from '../../../store/toastStore';

type CartItemCardProps = {
  productId: number;
  imageUrl?: string;
  name: string;
  mrp: string | number;
  price: string | number;
  onRemove?: () => void;
  removing?: boolean;
  onQuantityChange?: () => void;
  quantityOrg?: number;
  fromOrderDesc: boolean;
  isPrescriptionRequired?: string;
  packSize?: string;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  productId,
  imageUrl,
  name,
  mrp,
  price,
  onRemove,
  removing = false,
  onQuantityChange,
  fromOrderDesc,
  quantityOrg,
  isPrescriptionRequired,
  packSize,
}) => {
  console.log(packSize, 'packSize');
  const customer_id = useAuthStore(state => state.customer_id);

  const quantity = useCartStore(state =>
    state.getProductQuantity(customer_id?.toString() ?? '', productId),
  );
  const setProductQuantity = useCartStore(state => state.setProductQuantity);
  const showToast = useToastStore(state => state.showToast);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const {getOriginalProduct} = useProductStore();
  const originalProduct = getOriginalProduct(productId.toString());
  const {setSelectedCoupon} = useCouponStore();
  const availableInventory = originalProduct?.StockAvailableInInventory || 0;
  const isOutOfStock = availableInventory === 0;
  const canIncreaseQuantity = quantity < availableInventory;
  const {removeFromCart} = useCartStore.getState();

  const increaseQty = async () => {
    if (isLoading || !canIncreaseQuantity) {
      return;
    }
    setProductQuantity(customer_id?.toString() ?? '', productId, quantity + 1);
    try {
      setProductQuantity(
        customer_id?.toString() ?? '',
        productId,
        quantity + 1,
      );
      onQuantityChange?.();
    } finally {
      setIsLoading(false);
    }
  };

  const decreaseQty = async () => {
    if (isLoading || quantity <= 1) {
      return;
    }
    setProductQuantity(customer_id?.toString() ?? '', productId, quantity - 1);
    try {
      setProductQuantity(
        customer_id?.toString() ?? '',
        productId,
        quantity - 1,
      );
      onQuantityChange?.();
    } finally {
      setIsLoading(false);
    }
  };
  console.log('prescription', isPrescriptionRequired);
  const handleRemove = async () => {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);

      await DeleteFromCart(customer_id?.toString() ?? '', [productId]);
      setProductQuantity(customer_id?.toString() ?? '', productId, 0);
      setSelectedCoupon(String(customer_id), null);
      removeFromCart(customer_id?.toString() ?? '', productId);
      showToast(`${name} removed from cart`, 'error', 1000, true);
      if (onRemove) {
        onRemove();
      }

      console.log('Product successfully removed from cart');
    } catch (error) {
      console.error('Error deleting product from cart:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } finally {
      setIsDeleting(false);
    }
  };

  // const totalPrice = Number(price) * quantity;
  const showLoading = isLoading || removing || isDeleting;

  return (
    <View>
      <View style={styles.card}>
        {/* Left Image */}
        <Image source={{uri: imageUrl}} style={styles.image} />
        {/* Middle Details */}
        <View style={styles.middleContent}>
          <Text style={styles.name}>
            {name.length > 20 ? name.slice(0, 20) + '...' : name}
          </Text>
          <Text style={styles.quantity}>Strip of {packSize}</Text>
          {!fromOrderDesc ? (
            <View style={styles.priceRow}>
              <Text style={styles.actualPrice}>₹{mrp}</Text>
              <Text style={styles.mrp}>₹{price}</Text>
            </View>
          ) : (
            <Text style={styles.mrpBig}>Quantity : {quantityOrg}</Text>
          )}
        </View>
        {/* Right Side Delete & Controls */}
        {fromOrderDesc ? (
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.actualPrice}>₹{mrp}</Text>
            <Text style={styles.mrp}>₹{price}</Text>
          </View>
        ) : (
          <View style={styles.rightControls}>
            <TouchableOpacity
              style={styles.deleteIcon}
              onPress={handleRemove}
              disabled={showLoading}>
              {isDeleting ? (
                <ActivityIndicator size="small" color="#EB5757" />
              ) : (
                <Trash2 size={16} color="#EB5757" />
              )}
            </TouchableOpacity>

            <View style={styles.counterContainer}>
              <TouchableOpacity
                onPress={decreaseQty}
                disabled={showLoading || quantity <= 1}>
                <SquareMinus
                  size={20}
                  color={showLoading || quantity <= 1 ? '#cccccc' : '#0088B1'}
                  strokeWidth={1.25}
                />
              </TouchableOpacity>
              <Text style={styles.counterText}>{quantity}</Text>
              <TouchableOpacity
                onPress={increaseQty}
                disabled={showLoading || !canIncreaseQuantity}>
                <SquarePlus
                  size={20}
                  color={
                    showLoading || !canIncreaseQuantity ? '#cccccc' : '#0088B1'
                  }
                  strokeWidth={1.25}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={{paddingHorizontal: 50}}>
        {isOutOfStock && (
          <View style={styles.outOfStockContainer}>
            <View style={styles.outOfStockLeft}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
              <Text style={styles.outOfStockSubText}>
                (This item will not be added to the checkout)
              </Text>
            </View>
          </View>
        )}

        {isPrescriptionRequired == 'Yes' && !isOutOfStock && (
          <View style={styles.prescriptionRequiredContainer}>
            <View style={styles.outOfStockLeft}>
              <Text style={styles.outOfStockText}>Prescription Required</Text>
              <Text style={styles.outOfStockSubText}>
                (This item needs prescription to procced for the checkout)
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default CartItemCard;
