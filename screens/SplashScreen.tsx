import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const SplashScreen = ({ navigation }: Props) =>  {
  
    useEffect(() => {
 
          setTimeout(() => {
           
            navigation.replace('Login')
          }, 3000)     
    })
  
      return (
        <View style={styles.image}>
          <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{
              width: '70%',
              height: 250,
              padding: 10,
              resizeMode: 'contain'
            }}
            source={require('../images/foodMonks.png')}
          />
        </View>
      )
    }

export default SplashScreen

    const styles = StyleSheet.create({
      image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
     }
    });
