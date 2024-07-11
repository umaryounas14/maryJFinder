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

const Intractions = ({navigation}) => {
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
                marginRight: 200,
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
            <View style={[styles.searchContainer]}>
              <Text style={{marginLeft: 5, color: '#B4B4B4'}}>Search</Text>
            </View>
          </KeyboardAvoidingView>
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

export default Intractions;


