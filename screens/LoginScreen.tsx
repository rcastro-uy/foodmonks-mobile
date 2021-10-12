import React from "react";
import { View, Text, StyleSheet, Button, TouchableHighlight, DrawerLayoutAndroid } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen({navigation}:any) {
    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button
                title="Continuar"
                onPress={() =>
                    navigation.navigate('HomeDrawer')
                }
            />
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});