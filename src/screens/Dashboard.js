import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Block, Button, Input, theme } from 'galio-framework';
import { useDispatch, useSelector } from 'react-redux';
const { width } = Dimensions.get('window');
import LineChartComponent from '../components/LineChart';
import TableView from '../components/TableView';

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const opacityAnimation = new Animated.Value(1);

  const words = [
    ['Search Subject', 'Product Category', 'Impressions', 'Map Clicks', 'Cart Clicks', 'Avg CTR', 'Inquiries'],
    ['sleepy edibles', 'Edibles', '5643', '332', '2321', '212', 'Looking for some sleepy..'],
    ['blueberry pre-rolls', 'Pre-rolls', '5454', '4354', '342', '454', 'Where can I find pre-rolls...'],
    ['phat panda', 'Brand', '4343', '454', '454', '454', 'What’s the best brand...'],
    ['4 pack pre-rolls', 'Pre-rolls', '3943', '3445', '453', '454', 'Which store has....'],
    ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 3000); // 20 seconds interval

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const handleLogout = async () => {
    try {
      // Remove the access token from AsyncStorage
      await AsyncStorage.removeItem('accessToken');
      // Navigate to the login screen
      navigation.navigate('ChatScreen');
      navigation.reset({
        index: 0,
        routes: [{ name: 'ChatScreen' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigateToChatScreen = () => {
    navigation.navigate('ChatScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.announcementBanner}>
          <Text style={styles.announcementText}>Activate Your Store!</Text>
        </View>
        <Block flex middle style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Hello, John Smith</Text>
          {/* <Text style={styles.notificationCountText}>You have <Text style={{ color: '#2594E5' }}>3 new notifications</Text></Text> */}
          <View style={styles.blocksContainer}>
            <View style={styles.block}>
              <Text style={styles.blockTitle}>Impressions</Text>
              <Text style={styles.blockValue}>32.4K</Text>
              <Text style={styles.blockAction}>View Data</Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.blockTitle}>CTR</Text>
              <Text style={styles.blockValue}>1.5K</Text>
              <Text style={styles.blockAction}>View Data</Text>
            </View>
          </View>
          <View style={styles.blocksContainer}>
            <View style={styles.block}>
              <Text style={styles.blockTitle}>Stores</Text>
              <Text style={styles.blockValue}>2</Text>
              <Text style={styles.blockAction}>View Stores</Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.blockTitle}>Products</Text>
              <Text style={styles.blockValue}>3.5k</Text>
              <Text style={styles.blockAction}>View Products</Text>
            </View>
          </View>
          {/* <View style={styles.lineChartContainer}>
            <LineChartComponent />
          </View> */}
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>User Inquiries</Text>
            <TableView data={words} />
          </View>
          <Button
            style={styles.logoutButton}
            onPress={handleLogout}>
            Logout
          </Button>
        </Block>
        {/* Chat bot icon */}
        <Animated.View style={[styles.chatIconContainer, { opacity: opacityAnimation }]}>
          {isVisible && (
            <TouchableOpacity style={styles.chatIconTouchable} onPress={navigateToChatScreen}>
              <Image
                source={require('../assets/splash.png')} 
                style={styles.chatIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  announcementBanner: {
    backgroundColor: '#099D63',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  announcementText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
  },
  userInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  notificationCountText: {
    color: 'black',
    marginTop: 10,
  },
  blocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: 20,
  },
  block: {
    width: '47%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  blockValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  blockAction: {
    fontSize: 12,
    color: '#2594E5',
    marginTop: 5,
    textAlign: 'right',
  },
  lineChartContainer: {
    width: '90%',
    marginVertical: 20,
  },
  tableViewContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
    zIndex: 0,
  },
  tableViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#FF4500',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  chatIconContainer: {
    position: 'absolute',
    top: 650, 
    right: 30, 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 1,
  },
  chatIconTouchable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatIcon: {
    width: 90,
    height: 90,
    marginLeft: 15, 
    marginTop: 15
  },
});

export default Dashboard;
