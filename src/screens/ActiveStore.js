import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import DropdownInput from '../components/DropDown';
const {width} = Dimensions.get('window');

const ActivateStore = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState({
    email: false,
    password: false,
  });

  const handleChange = (name, value) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const toggleActive = name => {
    setActive({...active, [name]: !active[name]});
  };

  const handleDropdownSelect = item => {
    setSelectedItem(item);
    setDropdownOpen(false);
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
            backgroundColor: 'green',
            borderRadius: 20,
            width: 30, // Adjust size as needed
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
        <KeyboardAvoidingView behavior="padding" enabled>

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
                style={{fontWeight: 'bold', marginRight: 180, color: 'black'}}>
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
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd', marginTop: -40},
                ]}
              />
              <Input
                color="black"
                placeholder="Last Name*"
                type="last-name"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
              <Input
                color="black"
                placeholder="Phone number*"
                type="phone-number"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
              <Input
                color="black"
                placeholder="Email Address*"
                type="email-address"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
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
                type="busniness-name"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={text => handleChange('email', text)}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
              <View style={{marginLeft: 20}}>
                <DropdownInput />
              </View>
              <Input
                color="black"
                placeholder="Address Line 1"
                type="address"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
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
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
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
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
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
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
              <View style={{marginLeft: 20}}>
                <DropdownInput />
              </View>
              <Input
                color="black"
                placeholder="Expiration (mm/dd/yyy)"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
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
                  onPress={() => navigation.navigate('Dashboard')}>
                  Continue
                </Button>
              </Block>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  announcementBanner: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
  },
  announcementText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'black',
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
  inputActive: {
    borderBottomColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: -7,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default ActivateStore;
