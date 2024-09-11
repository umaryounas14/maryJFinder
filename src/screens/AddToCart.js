import { View, Text } from 'react-native'
import React from 'react'

const AddToCart = ({route}) => {
    const { productId ,messageId,analyticsType} = route.params;
    console.log('messageId===================productDetails', messageId);
  return (
    <View>
      <Text>AddToCart</Text>
    </View>
  )
}

export default AddToCart