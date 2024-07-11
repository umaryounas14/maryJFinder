import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Block, Button, Input, theme } from 'galio-framework';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
import LineChartComponent from '../components/LineChart';
import StoreTableView from '../components/StoreTableView';
import TableView from '../components/TableView';
import BarChartComponent from '../components/BarChart';

const MyStores = ({ navigation }) => {
  const dispatch = useDispatch();

  const chartData = [
    { label: 'Product 1', value: 10 },
    { label: 'Product 2', value: 20 },
    { label: 'Product 3', value: 15 },
    { label: 'Product 4', value: 25 },
    { label: 'Product 5', value: 18 },
  ];

  const words1 = [
    ['Search Subject', 'Product Category', 'Impressions', 'Cart Clicks', 'Avg CTR' ],
    ['sleepy edibles', 'Edibles', '5643', '332', '2321',],
    ['blueberry pre-rolls', 'Pre-rolls', '5454', '4354', '342',],
    ['phat panda', 'Brand', '4343', '454','454', ],
    ['4 pack pre-rolls', 'Pre-rolls', '3943', '3445', '453', ],
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.announcementBanner}>
          <Text style={styles.announcementText}>Activate Your Store!</Text>
        </View>
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
        <TouchableOpacity
          style={[styles.addButton, {top: height * 0.15, right: width * 0.02}]}
          onPress={() => {}}>
          <Text style={styles.addButtonText}>+ Add Store</Text>
        </TouchableOpacity>
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={{padding: 5, marginBottom: 10, left: 10, top: height * 0.13}}>
              <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
                My Stores
              </Text>
            </View>
            <View style={{padding: 10, marginTop: height * 0.1}}>
              <StoreTableView data={words} />
            </View>
          </KeyboardAvoidingView>
        </Block>
        <Block flex middle>
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
          <TableView data={words1} />  
        </Block>
        <Block>
          <BarChartComponent data={chartData}/>
        </Block>
      </ScrollView>
    </View>
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
    padding:60,
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
    fontSize: 11,
    fontWeight: 'bold',
    position: 'absolute',
    top: 5,
    left: 12,
    marginRight: -80,
  },
  impressionCount: {
    textAlign: 'justify',
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 60,
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
});

export default MyStores;
