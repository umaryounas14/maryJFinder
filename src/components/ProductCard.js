import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import from react-native-vector-icons

const { width } = Dimensions.get('window');

const ProductCard = ({ product, onPress }) => {
  const renderCarouselItem = ({ index }) => (
    <Image source={{ uri: product.images[index] }} style={styles.carouselImage} />
  );

  // Function to render star icons based on rating
  const renderRating = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    return (
      <View style={styles.ratingContainer}>
        {[...Array(filledStars)].map((_, index) => (
          <Icon key={`filled-${index}`} name="star" size={15} color="#FFD700" />
        ))}
        {halfStar && <Icon name="star-half" size={15} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, index) => (
          <Icon key={`empty-${index}`} name="star-border" size={15} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <Card style={styles.card}>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay={true}
        data={product.images}
        renderItem={renderCarouselItem}
        scrollAnimationDuration={1000}
      />

      <Card.Content style={styles.info}>
        <Title style={styles.name}>{product.name}</Title>
        <Text style={styles.price}>${product.price}</Text>
        <Paragraph style={styles.description}>{product.description}</Paragraph>

        {/* Reviews */}
        <View style={styles.reviews}>
          <Text style={styles.reviewsTitle}>Reviews:</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => onPress(product)}
            style={styles.addToCartButton}
          >
            Add to Cart
          </Button>
          <Button
            mode="contained"
            onPress={() => onPress(product)}
            style={styles.viewDetailsButton}
          >
            View Details
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#888',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  reviews: {
    marginBottom: 15,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  review: {
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    flex: 1,
    marginRight: 5,
  },
  viewDetailsButton: {
    backgroundColor: '#007bff',
    flex: 1,
    marginLeft: 5,
  },
});

export default ProductCard;
