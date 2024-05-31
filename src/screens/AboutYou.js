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
import LinearGradient from 'react-native-linear-gradient';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';

const {width} = Dimensions.get('window');

const About = ({navigation}) => {
  const [name, setName] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [active, setActive] = useState({
    namre: false,
    Birthday: false,
  });

  const handleChange = (name, value) => {
    if (name === 'name') setName(value);
    if (name === 'birthday') setBirthday(value);
  };

  const toggleActive = name => {
    setActive({...active, [name]: !active[name]});
  };

  return (
    <ScrollView>
      <Block flex middle>
        <KeyboardAvoidingView behavior="padding" enabled>
          <View>
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
                marginLeft: 10
              }}>
              About You
            </Text>
          </Block>
          <Block flex>
            <Block center>
              <Input
                color="black"
                placeholder="Full Name"
                type="name"
                autoCapitalize="none"
                bgColor="transparent"
                onBlur={() => toggleActive('name')}
                onFocus={() => toggleActive('name')}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={text => handleChange('name', text)}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
              <Input
                color="black"
                placeholder="Birthday"
                type="name"
                autoCapitalize="none"
                bgColor="transparent"
                onBlur={() => toggleActive('name')}
                onFocus={() => toggleActive('name')}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={text => handleChange('name', text)}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
            </Block>
            <Block center flex style={{marginTop: 20}}>
              <Button
                size="medium"
                shadowless
                color="#20B340"
                style={{height: 48}}
                onPress={() =>
                    navigation.navigate('AboutBusiness')
                   }
                >
                Agree
              </Button>

              <Text
                center
                color={theme.COLORS.WHITE}
                size={theme.SIZES.FONT * 0.75}
                style={{color: '#313131', textAlign: 'center', paddingHorizontal:20, marginTop: 10}}>
                By clicking “Agree”, you agree to our Terms and have read our
                Privacy Policy. You are also claiming that you are at least 21
                yrs old or a valid medical patient.
              </Text>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signin: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },

  image: {
    marginTop: 10,
    width: 200,
    height: 200,
    marginLeft: 100,
    marginBottom: -80,
    resizeMode: 'contain',
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
 
 
});

export default About;
