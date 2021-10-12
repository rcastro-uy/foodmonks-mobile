import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"

export default function ProfileScreen({navigation}:any) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Screen</Text>
            <Button
                title="Cerrar sesion"
                onPress={() =>
                    navigation.navigate('Login')
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    }
})