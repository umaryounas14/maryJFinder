import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/ProductCard';
import MapComponent from '../components/MapView';
import { useDispatch } from 'react-redux';
import { trackAnalytics } from '../redux/slices/analyticsSlice';
const { width } = Dimensions.get('window');
const ProductScreen = ({ route ,navigation}) => {
  const { productId } = route.params; // Get the productId from route params
  // const{productId}='1090909090';
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
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
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        setProduct(data);
        dispatch(trackAnalytics({
          product_id: productId,
          type: 'impression',
        }));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId, dispatch]);


const handleAddToCart = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    // Analytics tracking API call
    await axios.post(
      'https://maryjfinder.com/api/analytics/track',
      {
        product_id: productId,
        type: 'cart_click',
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      }
    );
    // Add to cart API call
    await axios.post(
      'https://maryjfinder.com/api/cart/add',
      {
        product_id: productId,
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      }
    );

    // Navigate to the next screen
    navigation.navigate('ProductScreen', { productId });
  } catch (error) {
    console.error('Error adding to cart or tracking analytics:', error);
  }
};

  // const handleAddToCart = () => {
  //   dispatch(trackAnalytics({
  //     product_id: productId,
  //     type: 'cart_click',
  //   }));
  //   navigation.navigate('ProductScreen', { productId });
  //   // Add your add to cart logic here
  // };
  const handleMapLoaded = () => {
    dispatch(trackAnalytics({
      product_id: productId,
      type: 'map_click',
    }));
  };
  const handleMarkerPress = () => {
    dispatch(trackAnalytics({
      product_id: productId,
      type: 'map_click',
    }));
  };

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

  const latitude = parseFloat(product.body?.store?.latitude) || 37.7749;
  const longitude = parseFloat(product.body?.store?.longitude) || -122.4194;
  const storeTitle = product.body?.store?.title || 'Unknown Store';
  const hasValidCoordinates = !isNaN(latitude) && !isNaN(longitude);

  return (
    <ScrollView style={styles.container}>
      <ProductCard product={product} onAddToCart={handleAddToCart} />
      <Text style={styles.storeTitle}>Store Location</Text>
      {hasValidCoordinates ? (
        <View style={styles.mapContainer}>
          <MapComponent
            latitude={latitude}
            longitude={longitude}
            title={storeTitle}
            onMapLoaded={handleMapLoaded}
            onMarkerPress={handleMarkerPress}
          />
        </View>
      ) : (
        <View style={styles.center}>
          <Text>No map available for this product</Text>
        </View>
      )}
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
  mapContainer: {
    height: 300,
    width: width - 40,
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    opacity: 0.9,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    marginBottom: 20,
  },
  storeTitle: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ProductScreen;
