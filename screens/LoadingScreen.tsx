import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AddressContext } from '../context/AddressContext';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}
export const LoadingScreen = ({ navigation }: Props) => {

    const { usuario } = useContext( AuthContext );
    const {  cargarDirecciones } = useContext( AddressContext );
     useEffect(() => {

        cargarDirecciones(usuario!.direcciones)
          setTimeout(() => {
           
            navigation.replace('HomeDrawer');
          }, 1000)     
    })

    return (
        <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ActivityIndicator 
                size={ 60 }
                color="black"
            />
        </View>
    )
}