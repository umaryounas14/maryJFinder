import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import DropdownInput from '../components/DropDown';
import {useDispatch} from 'react-redux';
import {activateMyStore} from '../redux/slices/activateStoreSlice';
import DatePickerModal from '../components/DatePickerModal'; // Import the DatePickerModal

const {width} = Dimensions.get('window');

const ActivateStore = ({navigation, route}) => {
  const {storeId} = route.params || {storeId: null};
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    businessName: '',
    businessType: '',
    businessAddress1: '',
    businessAddress2: '',
    businessCity: '',
    businessState: '',
    businessPostcode: '',
    businessWebsite: '',
    businessLicense: '',
    businessLicenseType: '',
    businessLicenseExpiration: '',
  });

  const [errors, setErrors] = useState({});
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State for DatePickerModal
  const [dateMode, setDateMode] = useState('date'); // DatePicker mode

  const states = [
    {label: 'NY', value: '1'},
    {label: 'AL', value: '2'},
    {label: 'AK', value: '3'},
    {label: 'AZ', value: '4'},
    {label: 'FL', value: '5'},
    {label: 'HI', value: '6'},
    {label: 'MD', value: '7'},
    {label: 'MA', value: '8'},
  ];

  const businessTypes = [
    {label: 'Retail', value: '1'},
    {label: 'Service', value: '2'},
    {label: 'Manufacturing', value: '3'},
    {label: 'Wholesale', value: '4'},
    {label: 'Construction', value: '5'},
    {label: 'Technology', value: '6'},
    {label: 'Finance', value: '7'},
    {label: 'Healthcare', value: '8'},
    {label: 'Education', value: '9'},
    {label: 'Entertainment and Media', value: '10'},
    {label: 'Hospitality', value: '11'},
    {label: 'Real Estate', value: '12'},
  ];

  const licenseTypes = [
    {label: 'Business License', value: '1'},
    {label: 'Professional License', value: '2'},
    {label: 'Driver’s License', value: '3'},
    {label: 'Medical License', value: '4'},
    {label: 'Real Estate License', value: '5'},
    {label: 'Building Permit', value: '6'},
    {label: 'Food Service License', value: '7'},
    {label: 'Alcohol License', value: '8'},
    {label: 'Cosmetology License', value: '9'},
    {label: 'Insurance License', value: '10'},
    {label: 'Pharmacy License', value: '11'},
    {label: 'Education License', value: '12'},
    {label: 'Legal License', value: '13'},
    {label: 'Construction License', value: '14'},
    {label: 'Transportation License', value: '15'},
  ];

  const dispatch = useDispatch();

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'firstName',
      'lastName',
      'phone',
      'email',
      'businessName',
      'businessType',
      'businessCity',
      'businessState',
      'businessPostcode',
      'businessLicense',
      'businessLicenseType',
      'businessLicenseExpiration',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    }

    // Validate phone number (must be numeric)
    if (formData.phone && isNaN(Number(formData.phone))) {
      newErrors.phone = 'Phone number must be numeric';
    }

    // Validate email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email must be a valid email address';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    console.log('Payload being dispatched:', {...formData, store_id: storeId});

    dispatch(activateMyStore({...formData, store_id: storeId}))
      .then(response => {
        if (response.meta.requestStatus === 'fulfilled') {
          // Navigate back on successful dispatch
          navigation.goBack();
        }
      })
      .catch(err => {
        console.error('Dispatch failed:', err);
        // Handle error if needed
      });
  };

  const handleDateConfirm = date => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
      setFormData(prevState => ({
        ...prevState,
        businessLicenseExpiration: formattedDate,
      }));
    }
    setDatePickerVisible(false);
  };

  return (
    <View style={styles.container1}>
      <View style={styles.announcementBanner}>
        <Text style={styles.announcementText}>Activate Your Store!</Text>
      </View>
      <TouchableOpacity style={[styles.iconContainer, {top: 53, right: 60}]}>
        <Icon name="bell" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconContainer,
          {
            top: 50,
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
      <ScrollView>
        <Block flex middle>
          <View behavior="padding" enabled>
            <Block middle style={{paddingVertical: theme.SIZES.BASE * 4}}>
              <Text
                style={{
                  fontSize: 30,
                  color: '#000000',
                  fontWeight: '500',
                  marginLeft: 15,
                  marginTop: -20,
                }}>
                Activate Store
              </Text>
              <Text
                center
                color={theme.COLORS.WHITE}
                size={theme.SIZES.FONT * 0.75}
                style={{
                  color: '#949494',
                  textAlign: 'center',
                  paddingHorizontal: 20,
                  marginTop: 10,
                }}>
                Please fill out and submit the form below. By submitting this
                application on behalf of a company or another legal entity, you
                confirm that you have the authority to agree to the terms and
                conditions outlined here on their behalf.
              </Text>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: 180,
                    color: 'black',
                  }}>
                  Contact Information
                </Text>
              </View>
            </Block>
            <Block flex>
              <Block center>
                <Input
                  color="black"
                  placeholder="First Name*"
                  type="first-name"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd', marginTop: -40},
                  ]}
                  onChangeText={text => handleInputChange('firstName', text)}
                />
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Last Name*"
                  type="last-name"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                  onChangeText={text => handleInputChange('lastName', text)}
                />
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Phone number*"
                  type="phone-number"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                  onChangeText={text => handleInputChange('phone', text)}
                />
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Email Address*"
                  type="email-address"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                  onChangeText={text => handleInputChange('email', text)}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View style={{marginTop: 20}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginRight: 170,
                      color: 'black',
                    }}>
                    Business Information
                  </Text>
                </View>

                <Input
                  color="black"
                  placeholder="Business Name*"
                  type="business-name"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text => handleInputChange('businessName', text)}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                {errors.businessName && (
                  <Text style={styles.errorText}>{errors.businessName}</Text>
                )}

                <View style={{marginLeft: 20}}>
                  <DropdownInput
                    placeholder="Business Type*"
                    data={businessTypes}
                    onSelect={item =>
                      handleDropdownChange('businessType', item.label)
                    }
                  />
                </View>
                {errors.businessType && (
                  <Text style={styles.errorText}>{errors.businessType}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Address Line 1"
                  type="address"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessAddress1', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />

                <Input
                  color="black"
                  placeholder="Address Line 2"
                  type="address"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessAddress2', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />

                <Input
                  color="black"
                  placeholder="City*"
                  type="city"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text => handleInputChange('businessCity', text)}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                {errors.businessCity && (
                  <Text style={styles.errorText}>{errors.businessCity}</Text>
                )}

                <View style={{marginLeft: 20}}>
                  <DropdownInput
                    placeholder="State*"
                    data={states}
                    onSelect={item =>
                      handleDropdownChange('businessState', item.label)
                    }
                  />
                </View>
                {errors.businessState && (
                  <Text style={styles.errorText}>{errors.businessState}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Postal Code*"
                  autoCapitalize="none"
                  type="Postal Code"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessPostcode', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                {errors.businessPostcode && (
                  <Text style={styles.errorText}>
                    {errors.businessPostcode}
                  </Text>
                )}

                <Input
                  color="black"
                  placeholder="Website"
                  autoCapitalize="none"
                  type="website"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessWebsite', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />

                <View style={{marginTop: 20}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginRight: 250,
                      color: 'black',
                    }}>
                    License
                  </Text>
                </View>

                <Input
                  color="black"
                  placeholder="License No*"
                  type="license"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessLicense', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                {errors.businessLicense && (
                  <Text style={styles.errorText}>{errors.businessLicense}</Text>
                )}

                <View style={{marginLeft: 20}}>
                  <DropdownInput
                    placeholder="License Type*"
                    data={licenseTypes}
                    onSelect={item =>
                      handleDropdownChange('businessLicenseType', item.label)
                    }
                  />
                </View>
                {errors.businessLicenseType && (
                  <Text style={styles.errorText}>
                    {errors.businessLicenseType}
                  </Text>
                )}

                <TouchableOpacity
                  style={[
                    styles.input,
                    {
                      borderRadius: 15,
                      borderColor: '#ddd',
                      paddingVertical: 12,
                      paddingHorizontal: 15, // Ensure horizontal padding for consistency
                      borderWidth: 1, // Ensure border width matches other inputs
                      backgroundColor: 'transparent', // Set background color to match other inputs
                      marginBottom: 10, // Add margin if needed to match other inputs
                      marginTop: 10
                    },
                  ]}
                  onPress={() => setDatePickerVisible(true)} // Show the date picker
                >
                  <Text
                    style={{
                      color: formData.businessLicenseExpiration
                        ? 'black'
                        : '#949494',
                      fontSize: 16, // Ensure font size matches other inputs
                    }}>
                    {formData.businessLicenseExpiration ||
                      'Expiration (yyyy-mm-dd)'}
                  </Text>
                </TouchableOpacity>
                {errors.businessLicenseExpiration && (
                  <Text style={styles.errorText}>
                    {errors.businessLicenseExpiration}
                  </Text>
                )}
                <Text
                  center
                  color={theme.COLORS.WHITE}
                  size={theme.SIZES.FONT * 0.75}
                  style={{
                    color: '#949494',
                    textAlign: 'center',
                    paddingHorizontal: 30,
                    marginTop: 10,
                  }}>
                  By completing this form, you consent to Mary J. Finder
                  processing your information in accordance with our Privacy
                  Policy.
                </Text>
                <Block center flex style={{marginTop: 20}}>
                  <Button
                    size="medium"
                    shadowless
                    color="#20B340"
                    style={{height: 48}}
                    onPress={handleSubmit}>
                    Continue
                  </Button>
                </Block>
              </Block>
            </Block>
          </View>
        </Block>
      </ScrollView>
      <DatePickerModal
        visible={isDatePickerVisible}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        date={
          formData.businessLicenseExpiration
            ? new Date(formData.businessLicenseExpiration)
            : new Date()
        } // Default to current date if empty
        mode="date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
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
  iconContainer: {
    position: 'absolute',
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 20,
  },
});

export default ActivateStore;
