import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Link } from 'expo-router';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { Search, ChevronRight, ShoppingBag } from 'lucide-react-native';

import { typography } from '@/constants/typography';
import { colors } from '@/constants/colors';
import { SearchBar } from '@/components/SearchBar';
import { CategoryPill } from '@/components/CategoryPill';
import { ProductCard } from '@/components/ProductCard';
import { featuredProducts, categories, promotions } from '@/data/home';

const { width } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function HomeScreen() {
  const scrollY = useSharedValue(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const promotionRef = useRef(null);
  const [currentPromo, setCurrentPromo] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
      promotionRef.current?.scrollToIndex({
        index: (currentPromo + 1) % promotions.length,
        animated: true
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentPromo]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 50],
      [0, 1],
      'clamp'
    );

    return {
      opacity,
      backgroundColor: `rgba(255, 255, 255, ${opacity})`,
      borderBottomWidth: opacity > 0.5 ? 1 : 0,
      borderBottomColor: colors.gray[200],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View style={styles.headerContent}>
          <Text style={typography.h3}>TechStore</Text>
          <TouchableOpacity style={styles.cartButton}>
            <ShoppingBag size={24} color={colors.primary[600]} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <AnimatedFlatList
        data={[{ key: 'content' }]}
        renderItem={() => (
          <View style={styles.content}>
            <SearchBar placeholder="Search for products..." />

            <View style={styles.categoriesContainer}>
              <FlatList
                data={categories}
                renderItem={({ item }) => (
                  <CategoryPill
                    name={item.name}
                    icon={item.icon}
                    isActive={activeCategory === item.name}
                    onPress={() => setActiveCategory(item.name)}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesList}
              />
            </View>

            <View style={styles.promotionsContainer}>
              <FlatList
                ref={promotionRef}
                data={promotions}
                renderItem={({ item }) => (
                  <View style={styles.promotionItem}>
                    <Image source={{ uri: item.image }} style={styles.promotionImage} />
                    <View style={styles.promotionContent}>
                      <Text style={[typography.h4, { color: colors.white }]}>{item.title}</Text>
                      <Text style={[typography.body2, { color: colors.white }]}>{item.subtitle}</Text>
                      <TouchableOpacity style={styles.promotionButton}>
                        <Text style={[typography.button, { color: colors.primary[600] }]}>Shop Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                  const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                  setCurrentPromo(newIndex);
                }}
              />
              <View style={styles.paginationContainer}>
                {promotions.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentPromo && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            </View>

            <View style={styles.featuredContainer}>
              <View style={styles.sectionHeader}>
                <Text style={typography.h3}>New Arrivals</Text>
                <Link href="/all-products" asChild>
                  <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={[typography.button, { color: colors.primary[600] }]}>View All</Text>
                    <ChevronRight size={16} color={colors.primary[600]} />
                  </TouchableOpacity>
                </Link>
              </View>

              <FlatList
                data={featuredProducts}
                renderItem={({ item }) => (
                  <ProductCard
                    product={item}
                    onPress={() => {}}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsList}
              />
            </View>

            <View style={styles.featuredContainer}>
              <View style={styles.sectionHeader}>
                <Text style={typography.h3}>Best Sellers</Text>
                <Link href="/all-products" asChild>
                  <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={[typography.button, { color: colors.primary[600] }]}>View All</Text>
                    <ChevronRight size={16} color={colors.primary[600]} />
                  </TouchableOpacity>
                </Link>
              </View>

              <FlatList
                data={featuredProducts.slice().reverse()}
                renderItem={({ item }) => (
                  <ProductCard
                    product={item}
                    onPress={() => {}}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsList}
              />
            </View>
          </View>
        )}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 90,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartButton: {
    padding: 8,
  },
  content: {
    paddingTop: 90,
    paddingBottom: 20,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  promotionsContainer: {
    marginTop: 24,
    height: 200,
  },
  promotionItem: {
    width: width,
    height: 180,
    position: 'relative',
  },
  promotionImage: {
    width: width - 32,
    height: 180,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  promotionContent: {
    position: 'absolute',
    bottom: 16,
    left: 32,
    right: 32,
  },
  promotionButton: {
    backgroundColor: colors.white,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[300],
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.primary[600],
    width: 16,
  },
  featuredContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productsList: {
    paddingHorizontal: 16,
  },
});