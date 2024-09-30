import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductCard from '../components/ProductCard';
import MapComponent from '../components/MapView';
import { useDispatch } from 'react-redux';
import { trackAnalytics } from '../redux/slices/analyticsSlice';
const { width } = Dimensions.get('window');
const ProductScreen = ({ route ,navigation}) => {
  const { productId, messageId, linkUrl  } = route.params || {};
  console.log('linkUrl55555555555555555555linkUrl',linkUrl)
  // Get the productId from route params
  console.log('productId--------------productId------------------------------',productId);
  console.log('messageId--------------messageId------------------------------',messageId);
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
        const analyticsType = linkUrl.includes('/product/') ? 'product_click' : 'cart_click'; // Default to 'product_click'
        const messageId = route.params.messageId;
        const response = await fetch
        (
          `https://maryjfinder.com/api/product/${productId}?track_analytics=1&analytics_type=${analyticsType}&message_id=${messageId}`
          , 
          {
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
        console.log('data==================================newone==-------',data);
        setProduct(data);
       
        dispatch(trackAnalytics({
          product_id: productId,
          message_id : messageId,
          type: 'impression',
        }));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (productId,messageId) {
      fetchProduct();
    }
  }, [productId, dispatch,messageId,linkUrl]);


// const handleAddToCart = async () => {
//   try {
//     const accessToken = await AsyncStorage.getItem('accessToken');
//     if (!accessToken) {
//       throw new Error('No access token found');
//     }
//     // Analytics tracking API call
//     await axios.post(
//       'https://maryjfinder.com/api/analytics/track',
//       {
//         product_id: productId,
//         type: 'cart_click',
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Accept': 'application/json',
//         },
//       }
//     );
//     // Add to cart API call
//     await axios.post(
//       'https://maryjfinder.com/api/cart/add',
//       {
//         product_id: productId,
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Accept': 'application/json',
//         },
//       }
//     );

//     // Navigate to the next screen
//     navigation.navigate('ProductScreen', { productId });
//   } catch (error) {
//     console.error('Error adding to cart or tracking analytics:', error);
//   }
// };
// const handleAddToCart = async () => {
//   console.log('32323232323232323233')
//   try {
//     const accessToken = await AsyncStorage.getItem('accessToken');
//     if (!accessToken) {
//       throw new Error('No access token found');
//     }

//     // Track the cart click
//     await fetch('https://maryjfinder.com/api/analytics/track', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({
//         product_id: productId,
//         type: 'cart_click',
//       }),
//     });

//     // Add to cart API call
//     await fetch('https://maryjfinder.com/api/cart/add', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify({
//         product_id: productId,
//       }),
//     });
//     // Determine the navigation target based on the linkUrl
//     let navigationTarget = '';
//     let params = {};
//     const analyticsType = linkUrl.includes('/product/') ? 'product_click' : 'cart_click';
//     if (linkUrl.includes('/product/cart/')) {
//       {   navigationTarget = 'AddToCart';
//         params = { productId, messageId,analyticsType };
//       }
//       // console.log('ooooooooooooooooooooooooooooooooooooooooocartoooooooooooooooo')
//       // navigationTarget = 'AddToCart';
    
//       // Fetch product data to pass to the next screen
//       // const response = await fetch(`https://maryjfinder.com/api/product/${productId}`);
//       const response = await fetch(`https://maryjfinder.com/api/product/${productId}?track_analytics=1&analytics_type=${analyticsType}&message_id=${messageId}`)
//       if (!response.ok) {
//         throw new Error('Failed to fetch product data');
//       }
//       const productData = await response.json();
//        console.log('productData-=-=-=-=-=44444444-=-=-=-=-=-0000000000000000000000000000000000000000000000000000',response)
//       params = { productData, messageId };
//     } else if (linkUrl.includes('/product/')) {
//       // console.log('0000000000000000000000000000000000product00000000000000000000000000')
//       navigationTarget = 'ProductDetails';
//       params = { productId, messageId,analyticsType };
//     } else {
//       console.warn('Unhandled URL type:', linkUrl);
//       return;
//     }
//     // Navigate to the appropriate screen with the params
//     navigation.navigate(navigationTarget, params);

//   } catch (error) {
//     console.error('Error adding to cart or tracking analytics:', error);
//   }
// };
const handleAddToCart = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No access token found');
    }

    // Track the cart click
    await fetch('https://maryjfinder.com/api/analytics/track', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        type: 'cart_click',
      }),
    });

    // Add to cart API call
    await fetch('https://maryjfinder.com/api/cart/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
      }),
    });

    // Fetch the updated cart (if needed) or simply pass the product details to the next screen
    const analyticsType = linkUrl.includes('/product/') ? 'product_click' : 'cart_click';
    const response = await fetch(
      `https://maryjfinder.com/api/product/${productId}?track_analytics=1&analytics_type=${analyticsType}&message_id=${messageId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product data');
    }

    const productData = await response.json();

    // Navigate to the ProductDetails screen and pass the necessary data
    navigation.navigate('ProductDetails', {
      productId,
      messageId,
      productData,  // Pass the fetched product data
      selectedProducts: [productData] // Pass a list of selected products, here with just one for now
    });

  } catch (error) {
    console.error('Error adding to cart or tracking analytics:', error);
  }
};

  // const handleAddToCart = () => {
  //   dispatch(trackAnalytics({
  //     product_id: productId,
  //     type: 'cart_click',

  //   }));
  //   // if (analyticsType === 'product_click') {
  //   //   console.log('product_click-=-=-=-=-=-=-=-=-=-=-=-=-=-=9090909090900')
  //   //    navigation.navigate('ProductDetails', { productId, messageId });
  //   // } else if (analyticsType === 'cart_click') {
  //   //   console.log('cart_click090909-9-9-9-9-9-09-9-9-9-9-9-9-9-9-9-9-9-9-9')
  //   //   // navigation.navigate('LoginScreen');
  //   // }
  //   navigation.navigate('ProductDetails', { productId, messageId});
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
