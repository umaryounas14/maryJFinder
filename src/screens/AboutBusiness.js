import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
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
import DropdownInput from '../components/DropDown';


const {width} = Dimensions.get('window');

const AboutBusiness = ({navigation}) => {
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
    <ScrollView>
      <Block flex middle>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrowleft" size={24} color="#000" />
          </TouchableOpacity> */}
          <View style={{height: 150}}>
            <Image
              source={require('../assets/splash.png')}
              style={styles.image}
            />
          </View>

          <Block middle style={{paddingVertical: theme.SIZES.BASE * 2.625}}>
            <Text
              style={{
                fontSize: 30,
                color: '#000000',
                fontWeight: '500',
                marginLeft: 15,
              }}>
              About Your Business
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
                onBlur={() => toggleActive('email')}
                onFocus={() => toggleActive('email')}
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
                type="business-name"
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
                  onPress={() => navigation.navigate('AddBusiness')}>
                  Continue
                </Button>
              </Block>
            </Block>
          </Block>
      </Block>
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
    alignSelf: 'center',
    marginTop: 10, 
    marginLeft: 40,
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
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
    marginLeft: 10,
    marginRight: 10,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'green',
  },
});

export default AboutBusiness;
