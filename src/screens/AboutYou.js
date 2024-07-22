import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const About = ({navigation}) => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [accessToken, setAccessToken] = useState(null); // State to hold access token



  useEffect(() => {
    // Fetch access token from AsyncStorage on component mount
    const fetchAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setAccessToken(token);
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setBirthday(date);
  };


  const calculateAge = selectedDate => {
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const isUnder21 = () => {
    if (!birthday) return true;
    const age = calculateAge(birthday);
    return age < 21;
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Block flex middle>
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
              marginLeft: 10,
            }}>
            About You
          </Text>
        </Block>
        <Block flex center>
          <Block center>
            <Input
              color="black"
              placeholder="Full Name"
              autoCapitalize="none"
              bgColor="transparent"
              placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
              onChangeText={text => setName(text)}
              style={[styles.input, {borderRadius: 15, borderColor: '#ddd'}]}
            />
            <TouchableOpacity
              style={[
                styles.input,
                {
                  borderRadius: 15,
                  borderColor: '#ddd',
                  borderWidth: 1, // Add border width
                  paddingVertical: 10,
                },
                birthday ? styles.inputActive : null,
              ]}
              onPress={showDatePicker}>
              <Text style={{color: materialTheme.COLORS.PLACEHOLDER}}>
                {birthday ? birthday.toLocaleDateString() : 'Birthday'}
              </Text>
            </TouchableOpacity>
          </Block>
          <Block center flex style={{marginTop: 20}}>
            <Button
              size="medium"
              shadowless
              color="#20B340"
              style={{height: 48, opacity: isUnder21() ? 0.5 : 1}}
              onPress={() => {
                if (!isUnder21()) {
                  navigation.navigate('ChatScreen', accessToken);
                }
              }}
              disabled={isUnder21()}>
              Agree
            </Button>

            <Text
              center
              color={theme.COLORS.WHITE}
              size={theme.SIZES.FONT * 0.75}
              style={{
                color: '#313131',
                textAlign: 'center',
                paddingHorizontal: 20,
                marginTop: 10,
              }}>
              By clicking “Agree”, you agree to our Terms and have read our
              Privacy Policy. You are also claiming that you are at least 21 yrs
              old or a valid medical patient.
            </Text>
          </Block>
        </Block>
      </Block>
      {isDatePickerVisible && (
        <View style={styles.datePickerContainer}>
          <DatePicker
            mode="date"
            date={birthday || new Date()}
            onDateChange={handleConfirm}
            style={{width: 300}}
          />
          <Button
            style={styles.datePickerButton}
            onPress={hideDatePicker}
            color="#20B340"
            textStyle={{color: 'white'}}>
            Done
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 15,
    borderWidth: 1,
    borderColor: materialTheme.COLORS.PLACEHOLDER,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputActive: {
    borderColor: '#ddd',  
  },
  datePickerContainer: {
    position: 'absolute',
    bottom: -5,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
  },
  datePickerButton: {
    marginTop: 10,
  },
});
;

export default About;
