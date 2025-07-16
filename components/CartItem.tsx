import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onQuantityChange: (quantity: number) => void;
}

export function CartItem({ item, onRemove, onQuantityChange }: CartItemProps) {
  const { product, quantity } = item;
  
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.brand}>{product.brand}</Text>
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Trash2 size={16} color={colors.error[600]} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.bottomRow}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]} 
              onPress={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus size={14} color={quantity <= 1 ? colors.gray[400] : colors.primary[600]} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
              <Plus size={14} color={colors.primary[600]} />
            </TouchableOpacity>
          </View>
          
          <View>
            <Text style={styles.price}>${totalPrice.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                ${(product.originalPrice * quantity).toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    ...typography.caption,
    color: colors.gray[500],
  },
  removeButton: {
    padding: 4,
  },
  name: {
    ...typography.body1,
    marginVertical: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  quantityButtonDisabled: {
    backgroundColor: colors.gray[200],
  },
  quantity: {
    ...typography.body2,
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 12,
  },
  price: {
    ...typography.price,
    textAlign: 'right',
  },
  originalPrice: {
    ...typography.discount,
    textAlign: 'right',
  },
});