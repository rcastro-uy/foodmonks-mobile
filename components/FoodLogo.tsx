import React from 'react'
import { Image, View } from 'react-native'

export const FoodLogo = () => {
    return (
        <View style={{
            alignItems: 'center',
            marginBottom: 20
        }}>
            <Image 
                source={ require('../images/FoodMonks-logo_letras.png') }
                style={{
                    aspectRatio: 3,      
                    resizeMode: 'contain',

                    
                }}
            />
        </View>
    )
}