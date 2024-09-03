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
const {width, height} = Dimensions.get('window');
import LineChartComponent from '../components/LineChart';
import Heatmap from '../components/Heatmap';
import TableView from '../components/TableView';
import PredictiveAnalysisGraph from '../components/PredictiveAnalysisGraph';

const data = [
  {month: 'Jan', impressions: 10, ctr: 10},
  {month: 'Feb', impressions: 20, ctr: 20},
  {month: 'Mar', impressions: 30, ctr: 40},
  {month: 'Dec', impressions: 40, ctr: 60},
];
const data2 = [
    {month: 'Jan', impressions: 10, ctr: 10},
    {month: 'Feb', impressions: 20, ctr: 20},
    {month: 'Mar', impressions: 40, ctr: 40},
    {month: 'Dec', impressions: 30, ctr: 60},
  ];
  const data3 = [
    {month: 'Jan', impressions: 10, ctr: 10},
    {month: 'Feb', impressions: 30, ctr: 20},
    {month: 'Mar', impressions: 40, ctr: 40},
    {month: 'Dec', impressions: 60, ctr: 60},
  ];
  const data4 = [
    {month: 'Jan', impressions: 10, ctr: 10},
    {month: 'Feb', impressions: 20, ctr: 20},
    {month: 'Mar', impressions: 30, ctr: 40},
    {month: 'Dec', impressions: 60, ctr: 60},
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

const predictiveData = [
  ['Month', 'Project Imprssions', 'Projected Clicks', 'Projected CTR'],
  ['July', '18000', '2500', '10%'],
  ['August', '20000', '3000', '20%'],
  ['September', '22000', '3200', '15%'],
];

const Analytics = ({navigation}) => {
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

        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View
              style={{
                paddingVertical: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginRight: 180,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                  textDecorationLine: 'underline',
                  marginRight: 7,
                }}>
                All Stores
              </Text>
              <Icon name="arrow-down" size={13} color="black" />
            </View>
            <View style={[styles.dateContainer, styles.startDateContainer]}>
              <Icon
                name="calendar"
                size={20}
                color="#B4B4B4"
                style={styles.dateIcon}
              />
              <Text style={styles.datePickerText}>Start Date</Text>
            </View>
            <View style={[styles.dateContainer, styles.endDateContainer]}>
              <Icon
                name="calendar"
                size={20}
                color="#B4B4B4"
                style={styles.dateIcon}
              />
              <Text style={styles.datePickerText}>End Date</Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                  marginRight: 10,
                  marginTop: 10,
                }}>
                Overall Trends
              </Text>
            </View>
          </KeyboardAvoidingView>
        </Block>
        <View
          style={{
            marginLeft: 25,
            marginRight: 10,
            width: '90%',
          }}>
          <LineChartComponent data={data} lineColor={'orange'} label={'Impressions over time (jan-dec)'} />
        </View>
        <View
          style={{
            marginLeft: 25,
            marginRight: 10,
            width: '90%',
          }}>
          <LineChartComponent data={data2} lineColor={'orange'} label={'Store clicks over time (jan-dec)'} />
        </View>
        <View
          style={{
            marginLeft: 25,
            marginRight: 10,
            width: '90%',
          }}>
          <LineChartComponent data={data3} lineColor={'green'} label={'Map clicks over time (jan-dec)'} />
        </View>
        <View
          style={{
            marginLeft: 25,
            marginRight: 10,
            width: '90%',
          }}>
          <LineChartComponent data={data4} lineColor={'blue'} label={'Products click over time (jan-dec)'} />
        </View>
        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>
              Performance Comparison by Product
            </Text>
            <TableView data={performanceData} />
          </View>
        </Block>

        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>Top Queries</Text>
            <TableView data={topQuries} />
          </View>
        </Block>

        <View style={{marginLeft: 15, marginRight: 20}}>
          <Heatmap />
        </View>

        <Block flex middle>
          <View style={styles.tableViewContainer}>
            <Text style={styles.tableViewTitle}>Predictive analysis</Text>
            <TableView data={predictiveData} />
          </View>
        </Block>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: 8,
            marginLeft: 20,
          }}>
          <PredictiveAnalysisGraph />
        </View>
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
  dateContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#B4B4B4',
    borderRadius: 20,
    marginTop: -20,
  },
  startDateContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 30,
  },
  tableViewContainer: {
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
  endDateContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    marginBottom: 10,
  },
  datePickerText: {
    color: '#B4B4B4',
    marginLeft: 25,
  },
  dateIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    marginTop: 5,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#B4B4B4',
    borderRadius: 20,
    marginTop: 1,
  },
});

export default Analytics;
