import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { typography } from '@/constants/typography';
import { colors } from '@/constants/colors';
import { SearchBar } from '@/components/SearchBar';
import { FilterButton } from '@/components/FilterButton';
import { ProductGridCard } from '@/components/ProductGridCard';
import { getAllProducts } from '@/data/products';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const products = getAllProducts();
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={typography.h3}>Search Products</Text>
        <View style={styles.searchContainer}>
          <SearchBar 
            placeholder="Search for products, brands..." 
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          <FilterButton onPress={toggleFilter} />
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary[600]} />
        </View>
      ) : (
        <>
          <View style={styles.resultsHeader}>
            <Text style={typography.body2}>
              {filteredProducts.length === 0 
                ? 'No products found' 
                : `${filteredProducts.length} products found`}
            </Text>
          </View>

          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <ProductGridCard product={item} onPress={() => {}} />
            )}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productList}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              searchQuery.length > 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={typography.h5}>No results found</Text>
                  <Text style={[typography.body2, styles.emptyText]}>
                    Try different keywords or browse categories
                  </Text>
                </View>
              ) : (
                <View style={styles.emptyContainer}>
                  <Text style={typography.h5}>Search for products</Text>
                  <Text style={[typography.body2, styles.emptyText]}>
                    Try searching for products by name, category, or brand
                  </Text>
                </View>
              )
            }
          />
        </>
      )}
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
    paddingBottom: 8,
    backgroundColor: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    color: colors.gray[500],
  },
});