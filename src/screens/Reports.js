import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Block, theme} from 'galio-framework';
import DatePickerModal from '../components/DatePickerModal'; // Import the DatePickerModal component
import CustomCheckbox from '../components/CustomCheckBox'; // Import the CustomCheckbox component
import New from 'react-native-vector-icons/Feather';
import DrawerSceneWrapper from '../components/drawerSceneWrapper';

const {width, height} = Dimensions.get('window');

const Reports = ({navigation}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);



  const handleStartDateConfirm = date => {
    setStartDate(date);
    setShowStartDatePicker(false);
  };

  const handleEndDateConfirm = date => {
    setEndDate(date);
    setShowEndDatePicker(false);
  };

  const metrics = [
    'Impressions',
    'Clicks',
    'CTR',
    'Conversion Rate',
    'Top Queries',
    'Product Performance',
    'Geographic Data',
  ];

  const Data = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  const regions = [
    { label: 'North America', value: 'northAmerica' },
    { label: 'Europe', value: 'europe' },
    { label: 'Asia', value: 'asia' },
    { label: 'South America', value: 'southAmerica' },
    { label: 'Africa', value: 'africa' },
    { label: 'Australia', value: 'australia' },
  ];

  const handleCheckboxChange = metric => {
    setSelectedMetrics(prevState => ({
      ...prevState,
      [metric]: !prevState[metric],
    }));
  };

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
          {/* <TouchableOpacity onPress={openDrawer}>
          <New name="menu" size={30} style={{marginLeft: 10, marginTop: 20}} />
        </TouchableOpacity> */}
          <TouchableOpacity
            style={[
              styles.iconContainer1,
              {
                top: 64,
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
                  top: 50,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginRight: 100,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                    marginRight: 7,
                    marginLeft: 5,
                  }}>
                  Create Custom Reports
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  Name Your Report and Select Date Range
                </Text>
              </View>
              <View style={[styles.searchContainer]}>
                <Text style={{marginLeft: 5, color: '#B4B4B4'}}>
                  Name or Report
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.dateContainer, styles.startDateContainer]}
                onPress={() => setShowStartDatePicker(true)}>
                <Icon
                  name="calendar"
                  size={20}
                  color="#B4B4B4"
                  style={styles.dateIcon}
                />
                <Text style={[styles.datePickerText, styles.selectedDateText]}>
                  Start Date: {startDate.toDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dateContainer, styles.endDateContainer]}
                onPress={() => setShowEndDatePicker(true)}>
                <Icon
                  name="calendar"
                  size={20}
                  color="#B4B4B4"
                  style={styles.dateIcon}
                />
                <Text style={[styles.datePickerText, styles.selectedDateText]}>
                  End Date: {endDate.toDateString()}
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Block>

          {/* Date Picker Modals */}
          <DatePickerModal
            visible={showStartDatePicker}
            date={startDate}
            mode="date"
            onConfirm={handleStartDateConfirm}
            onCancel={() => setShowStartDatePicker(false)}
          />
          <DatePickerModal
            visible={showEndDatePicker}
            date={endDate}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={() => setShowEndDatePicker(false)}
          />

          <View style={styles.metricsContainer}>
            <Text style={styles.metricsHeader}>Select Your Metrics</Text>
            {metrics.map(item => (
              <CustomCheckbox
                key={item}
                label={item}
                isChecked={!!selectedMetrics[item]}
                onChange={() => handleCheckboxChange(item)}
              />
            ))}
          </View>
          <View style={styles.filterContianer}>
            <Text style={styles.infoText}>Filters</Text>
          </View>
          <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>Select Stores</Text>
          </View>
          <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>
              Select Product Categories
            </Text>
          </View>
          <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>
              Select Geographic Location
            </Text>
          </View>
          <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>
              Select Device Type
            </Text>
          </View>

          <View style={styles.metricsContainer}>
            <Text style={styles.metricsHeader}>Grouped By</Text>
            <Text style={{marginBottom: 10, marginLeft: 5}}>Date</Text>
            {Data.map(item => (
              <CustomCheckbox
                key={item}
                label={item}
                isChecked={!!selectedMetrics[item]}
                onChange={() => handleCheckboxChange(item)}
              />
            ))}
          </View>
          <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>Categories</Text>
          </View>
          <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>Products</Text>
          </View>
          <View style= {{marginLeft: 30, marginBottom: 10}}>
          <CustomCheckbox
            key={'Include User Query'}
            label={'Include User Query'}
            isChecked={!!selectedMetrics['Include User Query']}
            onChange={() => handleCheckboxChange('Include User Query')} 
          />
          </View>
          <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>Region</Text>
          </View>
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
  dateContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#B4B4B4',
    borderRadius: 20,
    marginTop: -20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startDateContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    marginBottom: 30,
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
  selectedDateText: {
    fontWeight: 'bold', // Apply bold font weight
  },
  dateIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    marginTop: 5,
  },
  searchContainer: {
    backgroundColor: 'transparent',
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#B4B4B4',
    borderRadius: 20,
    marginTop: 1,
    
  },
  filter: {
    backgroundColor: 'transparent',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#B4B4B4',
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  infoContainer: {
    marginBottom: 10,
    marginTop: 60,
  },
  filterContianer: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 30,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  metricsContainer: {
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 10,
  },
  metricsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default Reports;
