import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { typography } from '@/constants/typography';
import { colors } from '@/constants/colors';
import { CartItem } from '@/components/CartItem';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { useCart } from '@/hooks/useCart';

export default function CartScreen() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const checkoutProgress = useSharedValue(0);
  
  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty', 'Add some products to your cart before checking out.');
      return;
    }
    
    setIsCheckingOut(true);
    checkoutProgress.value = withTiming(1, { duration: 2000 });
    
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      checkoutProgress.value = 0;
      Alert.alert('Success', 'Your order has been placed successfully!');
    }, 2000);
  };

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${checkoutProgress.value * 100}%`,
    };
  });

  if (cart.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={typography.h3}>Your Cart</Text>
        </View>
        
        <EmptyState
          title="Your cart is empty"
          message="Looks like you haven't added anything to your cart yet."
          buttonText="Start shopping"
          buttonLink="/"
          icon="shopping-cart"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h3}>Your Cart</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Clear Cart',
              'Are you sure you want to remove all items from your cart?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', onPress: clearCart, style: 'destructive' },
              ]
            );
          }}
        >
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeFromCart(item.product.id)}
            onQuantityChange={(qty) => updateQuantity(item.product.id, qty)}
          />
        )}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.cartList}
        ListFooterComponent={
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={typography.body1}>Subtotal ({totalItems} items)</Text>
              <Text style={typography.price}>${totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={typography.body1}>Shipping</Text>
              <Text style={typography.body1}>
                {totalAmount >= 100 ? 'Free' : '$10.00'}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={typography.h5}>Total</Text>
              <Text style={typography.h3}>
                ${(totalAmount + (totalAmount >= 100 ? 0 : 10)).toFixed(2)}
              </Text>
            </View>
            
            <Button 
              title={isCheckingOut ? 'Processing...' : 'Checkout'}
              onPress={handleCheckout}
              disabled={isCheckingOut}
              style={styles.checkoutButton}
            />
            
            {isCheckingOut && (
              <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, progressStyle]} />
              </View>
            )}
            
            <Link href="/" asChild>
              <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueText}>Continue Shopping</Text>
              </TouchableOpacity>
            </Link>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearButton: {
    ...typography.button,
    color: colors.error[600],
  },
  cartList: {
    paddingBottom: 24,
  },
  summaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginVertical: 12,
  },
  checkoutButton: {
    marginTop: 16,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: colors.gray[200],
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.success[600],
  },
  continueButton: {
    alignItems: 'center',
    marginTop: 16,
    padding: 8,
  },
  continueText: {
    ...typography.button,
    color: colors.primary[600],
  },
});