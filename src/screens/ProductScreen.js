import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard'; // Ensure the path is correct

const products = [
  {
    id: '1',
    name: 'Product One',
    price: '29.99',
    images: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/201',
      'https://via.placeholder.com/202',
    ],
    description: 'This is a description of Product One.',
    reviews: [
      { rating: 4, comment: 'Great product!' },
      { rating: 5, comment: 'Exceeded expectations.' },
    ],
  },
  // Add more products as needed
];

const ProductScreen = ({ navigation }) => {
  const handlePress = (product) => {
    // Navigate to the ProductDetails screen, passing the product as a parameter
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handlePress} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});

export default ProductScreen;
