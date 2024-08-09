// ProductScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/ProductCard'; // Ensure the path is correct

const ProductScreen = ({ route }) => {
  const { productId } = route.params; // Get the productId from route params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // Retrieve the Bearer token from AsyncStorage
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('No access token found');
        }

        // Fetch the product details from the API
        const response = await fetch(`https://maryjfinder.com/api/product/${productId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          // Handle non-2xx status codes
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        // Parse the JSON response
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>No product found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ProductCard product={product} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
