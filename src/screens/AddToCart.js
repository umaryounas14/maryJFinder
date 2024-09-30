
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
import Icon from 'react-native-vector-icons/AntDesign'; 
const ProductDetails = ({ route, navigation }) => {
  const {  productId, messageId,analyticsType } = route.params;

  console.log('productId',productId)
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // default quantity 1
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://maryjfinder.com/api/product/${productId}?track_analytics=1&analytics_type=${analyticsType}&message_id=${messageId}`);
      const data = await response.json();
      setProductData(data.body);
      console.log('setProductData-------99999999999999 add to cart 9',productData)
      
      // Assuming response contains product data in body
      
      setLoading(false);
    } catch (error) {
      setError('Error fetching product details');
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId,
      name: productData.title, // assuming 'title' is the product name
      quantity,
      price: productData.price, // assuming price is in productData
    }));
  };

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
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

  const selectedProductInCart = cartItems.find(item => item.productId === productId);

  return (
    <ScrollView style={styles.container}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
      <View style={styles.header}>

        {/* Add to Cart Basket Icon */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <View style={styles.basketContainer}>
            {/* <Image source={require('../assets/basket.png')} style={styles.basketIcon} /> */}
            {/* {selectedProductInCart && (
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityText}>{selectedProductInCart.quantity}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View> */} 

     {/* <View style={styles.productDetails}> */}
        {/* Product Name */}
        {/* <Text style={styles.productName}>{productData.title}</Text> */}

        {/* Product Image */}
        {/* <Image source={{ uri: productData.image }} style={styles.productImage} /> */}

        {/* Product Price */}
        {/* <Text style={styles.productPrice}>${productData.price}</Text> */}

        {/* Increment/Decrement Quantity */}
        {/* <View style={styles.quantityContainer}>
          <Button title="-" onPress={decrement} />
          <Text style={styles.quantityText}>{quantity}</Text>
          <Button title="+" onPress={increment} />
        </View> */}

        {/* Add to Cart Button */}
        {/* <TouchableOpacity style={styles.btnView}>
          <Text style={styles.btnText}>Confirm Order</Text>
        </TouchableOpacity>
        {/* <Button title="Continue Order" onPress={handleAddToCart} /> */}
      {/* </View> */} 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  basketContainer: {
    position: 'relative',
  },
  basketIcon: {
    width: 30,
    height: 30,
  },
  quantityBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  productDetails: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  
  },
  quantityText: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  btnView:{
    backgroundColor:'green',
    paddingHorizontal:10,
    paddingVertical:18,
    bottom:0,
    position:'absolutes',
    borderRadius:10
  },
  btnText:{
    color:'white',
    fontWeight:'500',
    textAlign:"center"
  }
});

export default ProductDetails;

// import { View, Text, Image, StyleSheet, FlatList, ScrollView,ActivityIndicator  } from 'react-native';
// import React, { useState,useEffect } from 'react';
// import { useSelector } from 'react-redux';

// const ProductDetails = ({ route }) => {
//   const { productId ,messageId,analyticsType} = route.params;
//   console.log('messageId===================productDetails', messageId);
//   console.log('productId===================',productId);
//   console.log('analyticsType===============',analyticsType)
//   const { status, error } = useSelector((state) => state.analytics);
// const[productData ,setProductData]=useState(null);
// console.log('productData-=-=-=-=-=-=-=',productData)
//   if (status === 'loading') {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }
//   useEffect(() => {
//     // Fetch product details
//     fetchProductDetails();
    
//     // Fetch cart data
//     // fetchCartDetails();
//   }, []);
//   const fetchProductDetails = async () => {
//     try {
//       const response = await fetch(`https://maryjfinder.com/api/product/${productId}?track_analytics=1&analytics_type=${analyticsType}&message_id=${messageId}`);
//       const data = await response?.body?.data;
//       setProductData(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//       setLoading(false);
//     }
//   };
//   // Handle error state
//   if (status === 'failed') {
//     return (
//       <View style={styles.center}>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.container}>
//       <Text style={styles.title}>Analytics Data</Text>
//       {productData  ? (
//         <Text>{JSON.stringify(productData, null, 2)}</Text> // Display the data
//       ) : (
//         <Text>No data available</Text>
//       )}
//     </View>
//       {/* Product Name */}
//       {/* <Text style={styles.productName}>{product.title}</Text> */}

//       {/* Product Images */}
//       {/* <FlatList
//         horizontal
//         data={product.photos.map(photo => photo[0]?.image || photo)}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item }} style={styles.productImage} />
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.imageList}
//       /> */}

//       {/* Product Description */}
//       {/* <Text style={styles.productDescription}>{product.description || 'No description available.'}</Text> */}

//       {/* Product Price */}
//       {/* <Text style={styles.productPrice}>{product.price_with_currency}</Text> */}

//       {/* Product Reviews */}
//       {/* {product.reviews_count > 0 ? (
//         product.similarProducts.map((similarProduct, index) => (
//           <View key={index} style={styles.reviewContainer}>
//             <Text style={styles.reviewRating}>Rating: {similarProduct.rating || 0} / 5</Text>
//             <Text style={styles.reviewComment}>{similarProduct.title || 'No comment available.'}</Text>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.noReviewsText}>No reviews available</Text>
//       )} */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#ffffff',
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//   },
//   productDescription: {
//     fontSize: 16,
//     marginBottom: 16,
//     color: '#666',
//   },
//   imageList: {
//     marginBottom: 16,
//   },
//   productImage: {
//     width: 200,
//     height: 200,
//     marginRight: 8,
//     borderRadius: 8,
//   },
//   productPrice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#000',
//   },
//   reviewsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   reviewContainer: {
//     marginBottom: 12,
//     padding: 8,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   reviewRating: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   reviewComment: {
//     fontSize: 16,
//     color: '#777',
//   },
//   noReviewsText: {
//     fontSize: 16,
//     color: '#999',
//   },
// });

// export default ProductDetails;

// import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
// import React from 'react'

// const ProductDetails = ({route}) => {
//   const { product } = route.params;
//    console.log('productId',product)
//   return (
    

    
//     <View>
    
//       {/* <Text style={styles.productName}>{product.name}</Text> */}

//       <FlatList
//         horizontal
//         data={product.images}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item }} style={styles.productImage} />

          
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.imageList}
//       />
//             <Text style={styles.productDescription}>{product.description}</Text>
//             <Text style={styles.productPrice}>${product.price}</Text>
    
//             {product.reviews && product.reviews.length > 0 ? (
//         product.reviews.map((review, index) => (
//           <View key={index} style={styles.reviewContainer}>
//             <Text style={styles.reviewRating}>Rating: {review.rating} / 5</Text>
//             <Text style={styles.reviewComment}>{review.comment}</Text>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.noReviewsText}>No reviews available</Text>
//       )}
//     </View>
    
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#ffffff',
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//   },
//   productDescription: {
//     fontSize: 16,
//     marginBottom: 16,
//     color: '#666',
//   },
//   imageList: {
//     marginBottom: 16,
//   },
//   productImage: {
//     width: 200,
//     height: 200,
//     marginRight: 8,
//     borderRadius: 8,
//   },
//   productPrice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#000',
//   },
//   reviewsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   reviewContainer: {
//     marginBottom: 12,
//     padding: 8,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   reviewRating: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   reviewComment: {
//     fontSize: 16,
//     color: '#777',
//   },
//   noReviewsText: {
//     fontSize: 16,
//     color: '#999',
//   },
// });
// export default ProductDetails