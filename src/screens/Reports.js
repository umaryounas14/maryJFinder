import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Block, theme,Button} from 'galio-framework';
import DatePickerModal from '../components/DatePickerModal'; // Import the DatePickerModal component
import CustomCheckbox from '../components/CustomCheckBox'; // Import the CustomCheckbox component
import New from 'react-native-vector-icons/Feather';
import DrawerSceneWrapper from '../components/drawerSceneWrapper';
import DropdownInput from '../components/DropDown';
import Entypo from 'react-native-vector-icons/Entypo';
const {width, height} = Dimensions.get('window');

const Reports = ({navigation}) => {
  const [startDate, setStartDate] = useState(null);
  const [inputWidth, setInputWidth] = useState(width * 0.90);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // For Start Date
  const [endDate, setEndDate] = useState(null); // For End Date
  const [currentDatePicker, setCurrentDatePicker] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const handleStartDateConfirm = date => {
    setStartDate(date);
    setShowStartDatePicker(false);
  };
  const handleDateConfirm = date => {
    if (currentDatePicker === 'start') {
      setSelectedDate(date); // Update the selected start date
    } else if (currentDatePicker === 'end') {
      setEndDate(date); // Update the selected end date
    }
    setDatePickerVisible(false);
    setCurrentDatePicker(null); // Reset the current date picker
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

  const states = [
    { label: 'Select Stores', value: '1' },
    { label: 'AL', value: '2' },
    { label: 'AK', value: '3' },
    { label: 'AZ', value: '4' },
    { label: 'FL', value: '5' },
    { label: 'HI', value: '6' },
    { label: 'MD', value: '7' },
    { label: 'MA', value: '8' },
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
          <TouchableOpacity onPress={openDrawer}>
          <Entypo name="menu" size={35} style={{color:'black',marginLeft: 10, marginTop: 10}} />
          </TouchableOpacity>
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
                  top: 70,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginRight: 100,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                    // marginRight: 7,
                    marginLeft: 14,
                  }}>
                  Create Custom Reports
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                  Name Your Report and Select Date Range
                </Text>
              </View>
            <View style={{margin:10}}>
            <TouchableOpacity
              onPress={() => {
                setCurrentDatePicker('start');
                setDatePickerVisible(true);
              }}
              style={[styles.dateContainer, { width: inputWidth }]}>
              <Icon
                name="calendar"
                size={20}
                color="#B4B4B4"
                style={styles.dateIcon}
              />
              <Text
                style={[
                  styles.dateText,
                  { color: selectedDate ? 'black' : 'lightgray' },
                ]}
              >
                {selectedDate ? selectedDate.toDateString() : 'Start Date'}
              </Text>
            </TouchableOpacity>

            <DatePickerModal
              visible={isDatePickerVisible && currentDatePicker === 'start'}
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisible(false)}
              date={selectedDate || new Date()} // Default to current date if not selected
              mode="date"
            />

            <View>
              <TouchableOpacity
                onPress={() => {
                  setCurrentDatePicker('end');
                  setDatePickerVisible(true);
                }}
                style={[styles.dateContainer, { width: inputWidth }]} >
                <Icon
                  name="calendar"
                  size={20}
                  color="#B4B4B4"
                  style={styles.dateIcon}
                />
                <Text
                  style={[
                    styles.dateText,
                    { color: endDate ? 'black' : 'lightgray' },
                  ]}
                >
                  {endDate ? endDate.toDateString() : 'End Date'}
                </Text>
              </TouchableOpacity>

              <DatePickerModal
                visible={isDatePickerVisible && currentDatePicker === 'end'}
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisible(false)}
                date={endDate || new Date()} // Default to current date if not selected
                mode="date"
              />

             <View style={[styles.searchContainer, { width: inputWidth }]}>
              <TextInput
                value={searchInput}
                onChangeText={setSearchInput}
                style={styles.searchInput}
                placeholder="Name or Report"
                placeholderTextColor={"lightgray"}
              />
            
            </View>
              </View>
            </View>
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
         
        
          <View style={{ marginLeft: 14 }}>
            <DropdownInput
              placeholder="Select Stores"
              data={states}
              onSelect={item => setSelectedState(item.label)}
            />
            </View>
            <View style={{ marginLeft: 14 }}>
            <DropdownInput
              placeholder="Select Product Categories"
              data={states}
              onSelect={item => setSelectedState(item.label)}
            />
            </View>
            <View style={{ marginLeft: 14 }}>
            <DropdownInput
              placeholder="Select Products"
              data={states}
              onSelect={item => setSelectedState(item.label)}
            />
            </View>
            <View style={{ marginLeft: 14 }}>
            <DropdownInput
              placeholder="Select Geographics Locations"
              data={states}
              onSelect={item => setSelectedState(item.label)}
            />
            </View>

            <View style={{ marginLeft: 14 }}>
            <DropdownInput
              placeholder="Select Device Type"
              data={states}
              onSelect={item => setSelectedState(item.label)}
            />
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
          {/* <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>Categories</Text>
          </View>
          <View style={[styles.filter]}>
            <Text style={{marginLeft: 5, color: '#B4B4B4'}}>Products</Text>
          </View> */}

          <View style= {{marginLeft: 30, marginBottom: 10}}>
          <Text style={styles.metricsHeader}>Include User Query</Text>
          <CustomCheckbox
            key={'Include User Query'}
            label={'Include User Query'}
            isChecked={!!selectedMetrics['Include User Query']}
            onChange={() => handleCheckboxChange('Include User Query')} 
          />
          </View>
       
             <Button
            style={styles.generateButton}>
            {/* // onPress={handleLogout}> */}
            Generate Report
          </Button>
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

  startDateContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    marginBottom: 30,
  },
  endDateContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 5,
    paddingVertical: 5,
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
    marginTop: 70,
    
  },
  filterContianer: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 30,
  },
  infoText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
    marginLeft: 15,
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
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    margin:3,
    marginTop: 10,
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:20,
    paddingVertical:10
    
  },
  dateIcon: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 15,
    color: 'black',
    fontWeight:'400'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 5,
    height:47,
    

  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 15,
    backgroundColor: 'transparent',
    borderRadius: 20,
    color: 'black',
    fontWeight:"400"
  },
  searchIcon: {
    marginLeft: 7,
    position:'absolute',
    marginTop:17,
    paddingHorizontal:3
  },
  generateButton: {
    backgroundColor: '#099D63',

    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
 
});

export default Reports;
