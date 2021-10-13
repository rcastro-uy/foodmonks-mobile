import React from 'react'
import { Dimensions, View } from 'react-native'

const { width: windowWidth } = Dimensions.get('window');
const { height: windowHeight } = Dimensions.get('window');
export const Background = () => {
    return (
        <View 
            style={{
                position: 'absolute',
                backgroundColor: '##FFFFFF',
                width: windowWidth,
                height: windowHeight,
               
            }}
        />
    )
}