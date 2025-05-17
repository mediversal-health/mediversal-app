import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './index.styles';
import {Trash2, SquareMinus, SquarePlus} from 'lucide-react-native';

type CartItemCardProps = {
  imageUrl: string;
  name: string;
  quantity: number;
  mrp: number;
  price: number;
};

const CartItemCard: React.FC<CartItemCardProps> = ({
  imageUrl,
  name,
  quantity: initialQty,
  mrp,
  price,
}) => {
  const [qty, setQty] = useState(initialQty);
  const totalPrice = price * qty;

  const increaseQty = () => setQty(qty + 1);
  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  return (
    <View style={styles.card}>
      {/* Left Image */}
      <Image source={{uri: imageUrl}} style={styles.image} />

      {/* Middle Details */}
      <View style={styles.middleContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.quantity}>Strip of Tablets: {qty}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.actualPrice}>₹{totalPrice}</Text>

          <Text style={styles.mrp}>₹{mrp}</Text>
        </View>
      </View>

      {/* Right Side Delete & Controls */}
      <View style={styles.rightControls}>
        <TouchableOpacity style={styles.deleteIcon}>
          <Trash2 size={20} color="#EB5757" />
        </TouchableOpacity>

        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={decreaseQty}>
            <SquareMinus size={20} color="#0088B1" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{qty}</Text>
          <TouchableOpacity onPress={increaseQty}>
            <SquarePlus size={20} color="#0088B1" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;
