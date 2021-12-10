import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react"
import { View, Text, TextInput, StyleSheet, Image, Keyboard, Alert } from "react-native"
import { Button, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Background } from "../components/Background";
import { FoodLogo } from "../components/FoodLogo";
import { AuthContext } from "../context/AuthContext";
import { loginStyles } from "../theme/LoginTheme";
import { recoverpassStyles } from "../theme/RecoverPasswordTheme";
import { validateEmail } from "../utils/helpers";

export default function RecoverPasswordScreen({navigation}:any) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)
    const [errorEmail, setErrorEmail] = useState("")

    // funcion para validar input 
    const validateData = () => {
        setErrorEmail("")
        
        let isValid = true
        
        if(!validateEmail(email)) {
            setErrorEmail("Debe ingresar un email válido.")
            isValid = false
        }
        return isValid
    }

    const { recuperarContrasenia, MensajeError, quitarError} = useContext( AuthContext );

    const onRecoverPassword = async () => {
        if (!validateData()) return ;
        Keyboard.dismiss();
        setLoading(true)
         await recuperarContrasenia(email);
        setLoading(false)
    }

    useEffect(() => {
        if( MensajeError.length === 0 ) return;
        Alert.alert( 'Error', MensajeError,[{
            text: 'Ok',
            onPress: quitarError
        }]);

    }, [ MensajeError ])

    return (
        <>
            <Background />

            <KeyboardAwareScrollView
                contentContainerStyle={ recoverpassStyles.formContainer }
            >
                <View style={{marginBottom:25}} > 
                    <FoodLogo />
                    <Text style={ recoverpassStyles.label }>Email:</Text>
                    <Input 
                        placeholder="Ingrese su email"
                        placeholderTextColor="rgba(255,80,40,0.3)"
                        inputContainerStyle={recoverpassStyles.inputField}
                        leftIcon={<Ionicons size={24} color={"#FD801E"} 
                        type={'font-awesome'} name="person"/>}
                        keyboardType="email-address"
                        selectionColor="black"
                        onChangeText = {setEmail}
                        value={email}
                        errorMessage={errorEmail}
                        onSubmitEditing={ onRecoverPassword }
                        autoCapitalize="none"
                        autoCorrect={ false }
                    />
                </View>
                <View style={ recoverpassStyles.buttonContainer }>
                    <Button
                        type="outline"
                        activeOpacity={ 0.8 }
                        title='Recuperar'
                        titleStyle={loginStyles.buttonText}
                        buttonStyle={loginStyles.button}
                        style={loginStyles.button}
                        onPress={ onRecoverPassword }
                        loading={loading}

                    />
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}