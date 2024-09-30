import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Block, Button, Input, theme} from 'galio-framework';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
import LineChartComponent from '../components/LineChart';
import StoreTableView from '../components/StoreTableView';
import TableView from '../components/TableView';
import BarChartComponent from '../components/BarChart';
import DrawerSceneWrapper from '../components/drawerSceneWrapper';
import { getStores } from '../redux/slices/getStoresSlice';
import Entypo from 'react-native-vector-icons/Entypo';
const MyStores = ({navigation}) => {
  const dispatch = useDispatch();
  //  const stores = useSelector((state) => state.stores.data);
  // const status = useSelector((state) => state.stores.status);
  // const error = useSelector((state) => state.stores.error);
  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(getStores());
  //   }
  // }, [dispatch, status]);

  //Transform store data into a format compatible with StoreTableView
  // const formattedStoreData = [
  //   ['Name', 'Email', 'Address', 'Type', 'Status', 'Action'],
  //   ...stores.map(store => [
  //     store.title,
  //     'N/A', // Email is not provided in the API response
  //     store.address,
  //     store.type,
  //     store.status_label,
  //     store.status === 'draft' ? 'Activate' : 'Edit',
  //   ]),
  //  ];


  const performanceData = [
    ['Product', 'Impressions', 'Sales', 'Clicks', 'Conversion Rate'],
    ['sleepy edibles', '1200', '1200', '300', '25%'],
    ['blueberry pre-rolls', '200', '900', '500', '55%'],
    ['phat panda', '590', '800', '450', '56%'],
  ];


  const userFeedback = [
    ['Query', 'feedback', 'Rating(1-5)'],
    ['edibles that help', 'help me sleep', '4.5'],
    ['cbd oil ', 'cbd oil for anxity', '4.7'],
    ['relief tincture', 'pain relief', '4.2'],
    ['strongest pre-rol', 'pain relief', '4.8'],
    ['relief tincture', 'pain relief', '4.2'],
  ];

  const missedOpportunites = [
    ['Query', 'Frquency', 'Impressions', 'notes'],
    ['Vegna THC edible', '50', '0', 'no matching product'],
    ['Organic Cbd oil', '200', '0', 'no matching product'],
    ['pre-rolles tobbacco', '590', '0', 'no matching product'],
  ];

  const topQuries = [
    ['Query', 'Frequency', 'Avg.CTR', 'Conversion Rate'],
    ['Edibles that help sleep', '30', '10%', '4%'],
    ['THC vape pen', '20', '20%', , '6%'],
    ['phat panda', '50', '15%', '5%'],
    ['CBD oil for anxity', '50', '8%', '5%'],
  ];

  const campaignPerformanceData = [
    ['Campaign name', 'Target Query', 'Impressions', 'CTR', 'Conversion Rate'],
    ['sleepy edibles sale', 'edibles for sleep', '1200', '11%', '25%'],
    ['pre-rolls promo', 'for anxity', '900', '13%', '55%'],
    ['vape pen discounts', 'THC vape pen', '9%', '450', '56%'],
  ];

  const words = [
    ['Name', 'Email', 'Address', 'Type', 'Status', 'Action'],
    [
      'Better Buds',
      'betterbuds@gmail.com',
      '2415 56th ST CT NW, Seattle, WA 98056',
      'Rec',
      'Not Activated',
      'Activate',
    ],
    [
      'Better Buds 2',
      'betterbuds@gmail.com',
      '251 South West CT NW, Bellevue, WA 98056',
      'Medical',
      'Activated',
      'Edit',
    ],
  ];

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <DrawerSceneWrapper>
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.announcementBanner}>
          <Text style={styles.announcementText}>Activate Your Store!</Text>
        </View>
        <TouchableOpacity onPress={openDrawer}>
          <Entypo name="menu" size={35} style={{color:'black',marginLeft: 10, marginTop: 10}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconContainer1,
            {
              top: 62,
              right: 60,
            },
          ]}>
          <Icon name="bell" size={24} color="black" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>5</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            {
              top: 59,
              right: 20,
              backgroundColor: '#099D63',
              borderRadius: 20,
              width: 30,
              height: 30,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Icon name="user" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigation.navigate('ProductScreen')}
          style={[styles.addButton, {top: height * 0.15, right: width * 0.02 , zIndex: 10 }]}>
          <Text style={styles.addButtonText}>+ Add Store</Text>
        </TouchableOpacity>
        <Block flex middle>
          <View behavior="padding" enabled>
            <View
              style={{
                padding: 5,
                marginBottom: 10,
                left: 10,
                top: height * 0.13,
              }}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
                My Stores
              </Text>
            </View>
            <View style={{padding: 10, marginTop: height * 0.1}}>
              {/* <StoreTableView data={formattedStoreData} /> */}
            </View>
          </View>
        </Block>
        <Block flex >
        <Text style={styles.dataTitle}>Overview</Text>
          <View style={styles.blocksContainer}>
            <View style={styles.block}>
              <Text style={styles.impression}>Total Products</Text>
              <Text style={styles.impressionCount}>32.4K</Text>
              <Text style={styles.dataView}>View Data</Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.impression}>Total Active Products</Text>
              <Text style={styles.impressionCount}>11.5K</Text>
              <Text style={styles.dataView}>View Data</Text>
            </View>
          </View>
          <View style={styles.blocksContainer1}>
            <View style={styles.block}>
              <Text style={styles.impression}>Impressions</Text>
              <Text style={styles.impressionCount}>2344</Text>
              <Text style={styles.dataView}>View Stores</Text>
            </View>
            <View style={styles.block}>
              <Text style={styles.impression}>CTR Stores</Text>
              <Text style={styles.impressionCount}>3.5k</Text>
              <Text style={styles.dataView}>View Products</Text>
            </View>
          </View>
          <View style={styles.blocksContainer1}>
            <View style={styles.block2}>
              <Text style={styles.impression}>CTR Add to Cart</Text>
              <Text style={styles.impressionCount}>200</Text>
              <Text style={styles.dataView}>View Stores</Text>
            </View>
          </View>
        </Block>
        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>Top Queries</Text>
            <TableView data={topQuries} />
          </View>
        </Block>
        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>
              Product Performance in Queries
            </Text>
            <Text style={{marginLeft: 20}}>Query matches:</Text>
            <TableView data={performanceData} />
          </View>
        </Block>
        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>User Feedback</Text>
            <TableView data={userFeedback} />
          </View>
        </Block>
        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>Missed Opportunities</Text>
            <TableView data={missedOpportunites} />
          </View>
        </Block>
        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>Search behavior analysis:</Text>
            <Text style={{marginLeft: 20}}>
              • <Text style={{fontWeight: 'bold'}}>Peak Search times</Text>:
              Most Queries are entered between 6PM-9PM
            </Text>
            <Text style={{marginLeft: 20}}>
              • <Text style={{fontWeight: 'bold'}}>Device Usage</Text>:
              70% mobile, 20% desktop, 5% tablet
            </Text>
          </View>
        </Block>
        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>
              Campaign Performance
            </Text>
            <Text style={{marginLeft: 20}}>Marketing Camapign Performance:</Text>
            <TableView data={campaignPerformanceData} />
          </View>
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
    color: 'black',
  },
  iconContainer: {
    position: 'absolute',
  },
  iconContainer1: {
    position: 'absolute',
    zIndex: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  blocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
  },
  blocksContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  block: {
    width: '47%',
    padding: 60,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  block2: {
    width: '96%',
    padding: 60,
    position: 'relative',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  impression: {
    textAlign: 'justify',
    color: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    top: 5,
    left: 12,
    marginRight: -80,
  },
  impressionCount: {
    textAlign: 'justify',
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 70,
    left: 30,
    margin: -20,
  },
  dataView: {
    textAlign: 'right',
    fontSize: 10,
    position: 'absolute',
    bottom: 5,
    right: 15,
    color: '#2594E5',
    height: 20,
    width: 70,
  },
  addButton: {
    position: 'absolute',
    backgroundColor: '#099D63',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
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
  },
  tableViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  dataTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    marginLeft: 20,
  },
});

export default MyStores;
