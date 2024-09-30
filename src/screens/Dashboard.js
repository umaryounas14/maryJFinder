import React, { useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Block, Button, theme } from 'galio-framework';
import LineChartComponent from '../components/LineChart';
import TableView from '../components/TableView';
import DrawerSceneWrapper from '../components/drawerSceneWrapper';
import Icon from 'react-native-vector-icons/Feather';
import MultiLineChart from '../components/MultiLineChart';
import { useDispatch, useSelector} from 'react-redux';
import { getStores } from '../redux/slices/getStoresSlice';

const { width } = Dimensions.get('window');

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const stores = useSelector((state) => state.stores); // Adjust based on your state structure
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');

      navigation.navigate('Login');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const data = [
    { month: 'Jan', impressions: 50, ctr: 10 },
    { month: 'Feb', impressions: 10, ctr: 20 },
    { month: 'Mar', impressions: 40, ctr: 40 },
    { month: 'Apr', impressions: 150, ctr: 50 },
    { month: 'May', impressions: -4, ctr: 60 },
    { month: 'Jun', impressions: -24, ctr: 70 },
    { month: 'Jul', impressions: 85, ctr: 50 },
    { month: 'Aug', impressions: 91, ctr: 20 },
    { month: 'Sep', impressions: 35, ctr: 30 },
    { month: 'Oct', impressions: 53, ctr: 85 },
    { month: 'Nov', impressions: -53, ctr: 30 },
    { month: 'Dec', impressions: 24, ctr: 60 },
  ];

  const words = [
    ['Search Subject', 'Product Category', 'Impressions', 'Map Clicks', 'Cart Clicks', 'Avg CTR', 'Inquiries'],
    ['sleepy edibles', 'Edibles', '5643', '332', '2321', '212', 'Looking for some sleepy..'],
    ['blueberry pre-rolls', 'Pre-rolls', '5454', '4354', '342', '454', 'Where can I find pre-rolls...'],
    ['phat panda', 'Brand', '4343', '454', '454', '454', 'What’s the best brand...'],
    ['4 pack pre-rolls', 'Pre-rolls', '3943', '3445', '453', '454', 'Which store has....'],
  ];

  const performanceData = [
    ['Product', 'Impressions', 'Sales', 'Clicks', 'Conversion Rate'],
    ['sleepy edibles', '1200', '1200', '300', '25%'],
    ['blueberry pre-rolls', '200', '900', '500', '55%'],
    ['phat panda', '590', '800', '450', '56%'],
  ];

  const topQuries = [
    ['Query', 'Frequency', 'Avg.CTR', 'Conversion Rate'],
    ['Edibles that help sleep', '30', '10%', '4%'],
    ['THC vape pen', '20', '20%', , '6%'],
    ['phat panda', '50', '15%', '5%'],
    ['CBD oil for anxity', '50', '8%', '5%'],
  ];

  return (
    <DrawerSceneWrapper>
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity onPress={() => navigation.navigate('ActivateStore')} style={styles.announcementBanner}>
          <Text style={styles.announcementText}>Activate Your Store!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="menu" size={30} style={{marginLeft: 10, marginTop: 10}} />
        </TouchableOpacity>
        <Block flex middle style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Hello, John Smith</Text>
          <Text style={styles.notificationCountText}>You have <Text style={{ color: '#2594E5' }}>3 new notifications</Text></Text>
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
          <View style={styles.lineChartContainer}>
            <MultiLineChart />
          </View>
          <View style={styles.performanceTableContainer}>
            <Text style={styles.tableViewTitle}>Performance Comparison by Product</Text>
            <TableView data={performanceData} />
          </View>
          <View style={styles.performanceTableContainer}>
            <Text style={styles.tableViewTitle}>Top Quries</Text>
            <TableView data={topQuries} />
          </View>
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
      </ScrollView>
    </View>
    </DrawerSceneWrapper>
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
    marginTop: 5,
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
    paddingHorizontal: 5,
  },
  performanceTableContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 5,
    flex: 1
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
    width: '70%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default Dashboard;
