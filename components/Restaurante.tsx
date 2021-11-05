import React, { Props } from 'react'
import { Image, View, Text } from 'react-native'
import { Restaurante, RestauranteComp } from '../interfaces/AppInterfaces'

export const RestauranteComponent = ({nombre, descripcion, imagen, calificacion}: RestauranteComp) => {
    return (
        <View style={{
            alignItems: 'center',
            marginBottom: 20
        }}>
            <Text>{imagen}</Text>
            <Text>{nombre}</Text>
            <Text>{calificacion}</Text>
        </View>
    )
}