import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      {/* Product Image */}
      <Image source={{ uri: product.body.image }} style={styles.image} />

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Product Title */}
        <Text style={styles.title}>{product.body.title}</Text>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★★★★☆</Text>
          <Text style={styles.reviewCount}>({product.body.review_count} reviews)</Text>
        </View>

        {/* Price and Stock */}
        <View style={styles.priceStockContainer}>
          <Text style={styles.price}>{product.body.sale_price_with_currency}</Text>
          <Text style={styles.stock}>In Stock: {product.body.stock}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{product.body.description}</Text>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Detail label="Category" value={product.body.category_id} />
          <Detail label="Brand" value={product.body.brand_id} />
          <Detail label="Store" value={product.body.store.title} />
        </View>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.button} onPress={() => console.log('Add to Cart pressed')}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

// Helper component for product details
const Detail = ({ label, value }) => (
  <View style={styles.detailContainer}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    margin: 16,
    elevation: 8, // More pronounced shadow
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#FFD700', // Gold color for stars
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#888',
  },
  priceStockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#d9534f', // Red color for price
  },
  stock: {
    fontSize: 16,
    color: '#5bc0de', // Light blue for stock status
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 22,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#28a745', // Green color for button
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductCard;
