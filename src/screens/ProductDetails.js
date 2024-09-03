
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import React from 'react'

const ProductDetails = ({route}) => {
  const { product } = route.params;
  // console.log('product',product)
  return (
    <>
    <Text>xfgvxgx</Text></>
    
    // <View>
    
    //   <Text style={styles.productName}>{product.name}</Text>

    //   <FlatList
    //     horizontal
    //     data={product.images}
    //     renderItem={({ item }) => (
    //       <Image source={{ uri: item }} style={styles.productImage} />

          
    //     )}
    //     keyExtractor={(item, index) => index.toString()}
    //     style={styles.imageList}
    //   />
    //         <Text style={styles.productDescription}>{product.description}</Text>
    //         <Text style={styles.productPrice}>${product.price}</Text>
    
    //         {product.reviews && product.reviews.length > 0 ? (
    //     product.reviews.map((review, index) => (
    //       <View key={index} style={styles.reviewContainer}>
    //         <Text style={styles.reviewRating}>Rating: {review.rating} / 5</Text>
    //         <Text style={styles.reviewComment}>{review.comment}</Text>
    //       </View>
    //     ))
    //   ) : (
    //     <Text style={styles.noReviewsText}>No reviews available</Text>
    //   )}
    // </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
  imageList: {
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    marginRight: 8,
    borderRadius: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  reviewContainer: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  reviewRating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  reviewComment: {
    fontSize: 16,
    color: '#777',
  },
  noReviewsText: {
    fontSize: 16,
    color: '#999',
  },
});
export default ProductDetails