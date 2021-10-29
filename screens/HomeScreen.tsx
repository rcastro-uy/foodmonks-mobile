import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({navigation, route}:any) {

    const { cerrarSesion } = useContext( AuthContext );
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
          
           {/*para probar el cierre de sesion */}
            <Button 
                title="cerrar sesion"
                color="#5856D6"
                onPress={ cerrarSesion }
            />
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