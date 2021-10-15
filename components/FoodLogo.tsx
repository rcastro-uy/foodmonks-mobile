import React from 'react'
import { Image, View } from 'react-native'

export const FoodLogo = () => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image 
                source={ require('../images/foodMonks.png') }
                style={{
                    width: 200,
                    height: 200 
                }}
            />
        </View>
    )
}