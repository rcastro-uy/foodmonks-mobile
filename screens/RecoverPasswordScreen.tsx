import React from "react"
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native"
import { passRecoverService } from "../services/passRecoverService";

export default function RecoveryPasswordScreen({navigation}:any) {
    const [email, setEmail] = React.useState("null");
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                uri: '../assets/icon.png',
                //foodMonks.png
                }}
            />
            <Text style={styles.text}>Ingresa tu correo</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="correo@gmail.com"
                keyboardType="email-address"
            />
            <Button
                title="Enviar"
                onPress={() =>
                    passRecoverService(email)
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    image: {

    }
})