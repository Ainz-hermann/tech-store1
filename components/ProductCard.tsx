import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Heart, ShoppingCart, Star } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import { Product } from '@/types/product';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

export function ProductCard({ product, onPress }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} />
        
        {product.originalPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.wishlistButton} onPress={handleWishlistToggle}>
          <Heart
            size={20}
            color={isWishlisted ? colors.accent[600] : colors.white}
            fill={isWishlisted ? colors.accent[600] : 'none'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.brand}>{product.brand}</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={colors.warning[600]} fill={colors.warning[600]} />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>
          
          <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
            <ShoppingCart size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: colors.white,
    marginRight: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.accent[600],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    ...typography.label,
    color: colors.white,
    fontSize: 10,
  },
  wishlistButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  brand: {
    ...typography.caption,
    color: colors.gray[500],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...typography.caption,
    color: colors.gray[800],
    marginLeft: 4,
  },
  name: {
    ...typography.h5,
    marginBottom: 8,
    height: 38,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    ...typography.price,
  },
  originalPrice: {
    ...typography.discount,
  },
  cartButton: {
    backgroundColor: colors.primary[600],
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});