import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import Icon from 'react-native-vector-icons/AntDesign'; // Import AntDesign icons

const {width} = Dimensions.get('window');

const UpgradePlan = ({navigation}) => {
  return (
    <ScrollView>
      <Block flex middle>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
          <View style = {{ height: 150}}>
            <Image
              source={require('../assets/splash.png')}
              style={styles.image}
            />
          </View>
          <Block middle style={{paddingVertical: theme.SIZES.BASE * 1.5}}>
            <Text
              style={{
                fontSize: 30,
                color: '#000000',
                fontWeight: '500',
                marginLeft: 10,
              }}>
              Upgrade Your Plan
            </Text>
          </Block>
      </Block>
      <View>
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 15,
            padding: 20,
            borderWidth: 1, // Add border width
            height: 300,
            borderColor: '#ddd',
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>Free</Text>
          <Text style={{color: 'black'}}>USD $0/month</Text>
          <Button
            size="medium"
            shadowless
            color="#ddd"
            style={{height: 48, width: 280, marginLeft:1}}
            onPress={() => navigation.navigate('UpgradePlan')}>
            Current Plan
          </Button>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            For businesses just getting started
          </Text>
          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>Basic Listing: Dispensary and product information</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Limited Product Listings: List a maximum of 5 products
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>View Store on Map: View store / directions</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Basic Analytics: Basic insights into how often products are
                viewed.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 15,
            padding: 20,
            borderWidth: 1, // Add border width
            height: 420,
            borderColor: '#ddd',
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>Free</Text>
          <Text style={{color: 'black'}}>USD $19.99/month</Text>
          <Button
            size="medium"
            shadowless
            color="#20B340"
            style={{height: 48, width: 280, marginLeft: 1}}
            onPress={() => navigation.navigate('UpgradePlan')}>
            Upgrade to Plus
          </Button>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Everything in Free, and:{' '}
          </Text>
          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Sponsored Listing: Enhanced visibility in search results
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>Increased Product Listings: List up to 100 products</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Promotional Posts: Ability to post monthly promotional content
                (e.g., discounts, special events) that users of the chatbot can
                see.
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Shopping Cart: Ability for users to add products to cart
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Detailed Analytics: More detailed insights into product views,
                interaction rates, and user demographics.{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 15,
            padding: 20,
            borderWidth: 1,
            height: 500,
            borderColor: '#ddd',
          }}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>Free</Text>
          <Text style={{color: 'black'}}>USD $39.99/month</Text>
          <Button
            size="medium"
            shadowless
            color="#0e1373"
            style={{height: 48, width: 280, marginLeft: 1}}
            onPress={() => navigation.navigate('UpgradePlan')}>
            <Text style={{color: 'white', fontSize: 16}}>
              Upgrade to Premium
            </Text>
          </Button>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Everything in Free, and:{' '}
          </Text>
          <View style={styles.container}>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Top-Tier Listing: Highest visibility in search results and on
                the main page.
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Unlimited Product Listings: No cap on the number of products
                listed.
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Featured Product Promotions: Products are periodically featured
                as recommendations in the chatbot interactions.
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Direct Marketing Tools: Ability to send targeted promotions
                directly to users based on their search history and preferences.
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Advanced Analytics: Comprehensive analytics dashboard with
                real-time data, trends analysis, and user engagement metrics.{' '}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.bullet}>•</Text>
              <Text>
                Priority Support: Dedicated account manager and 24/7 technical
                support.{' '}
              </Text>
            </View>
          </View>
        </View>
        <Block center flex style={{marginTop: 20}}>
          <Button
            size="medium"
            shadowless
            color="#20B340"
            style={{height: 48}}
            onPress={() => navigation.navigate('ChatScreen')}>
            Continue
          </Button>
        </Block>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? HeaderHeight + 10 : 10, // Adjust for different platform header heights
    left: 10,
    zIndex: 1, // Ensure it's above other components
    padding: 10,
  },

  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center', // Center the image horizontally
    marginTop: 10, // Add margin top as needed
    marginLeft: 30,
  },

  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: 'white',
  },
  container: {
    flexDirection: 'column',
    marginTop: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 5,
  },
  bullet: {
    marginRight: 5,
    alignSelf: 'baseline',
  },
});

export default UpgradePlan;
