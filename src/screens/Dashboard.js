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
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import { userInfo } from '../redux/slices/userInfo-slice';
import { useDispatch, useSelector } from 'react-redux';
const {width} = Dimensions.get('window');


const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch user info when Dashboard component mounts
    console.log('Fetching user info...');
    dispatch(userInfo());
  }, []);

  console.log('User Info:', userInfo);
 
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
          <View style={{ marginTop: 50, marginRight: 140 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>Hello, Jhon Smith</Text>
    </View>
    <View>
      <Text>You have <Text style={{ color: 'blue' }}>3 new notifications</Text></Text>
    </View>
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

export default Dashboard;
