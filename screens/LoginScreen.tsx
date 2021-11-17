import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableHighlight, DrawerLayoutAndroid, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Image, Keyboard, Alert } from "react-native";
import { Background } from "../components/Background";
import { FoodLogo } from "../components/FoodLogo";
import { loginStyles } from "../theme/LoginTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import InputPassword from "../components/InputPassword";
import { useForm } from "../hooks/useForm";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import { validateEmail } from "../utils/helpers";

interface Props extends StackScreenProps<any, any> {}

export default function LoginScreen({navigation}:Props) {
    const [hidePassword, setHidePassword] = useState(true)
    
    const { email, password, onChange } = useForm({
        email: '',
        password: '' 
     });

     //para validaciones de inputs
     const [errorEmail, setErrorEmail] = useState("")
     const [errorPassword, setErrorPassword] = useState("")

     // funcion para validar los inputs 
    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")
        
        let isValid = true
        
        if(password==='') {
            setErrorPassword("Debe ingresar su contraseña.")
            isValid = false
        }
        
        if(!validateEmail(email)) {
            setErrorEmail("Debe ingresar un email válido.")
            isValid = false
        }
        return isValid
    }   

     const { iniciarSesion, MensajeError, quitarError, getTokenMobile} = useContext( AuthContext );

     getTokenMobile();
     const onLogin = () => {
        if (!validateData()) return ;
        Keyboard.dismiss();
        iniciarSesion({ correo: email, contraseña : password });
    }

    useEffect(() => {
        if( MensajeError.length === 0 ) return;

        Alert.alert( 'Inicio de sesion fallido ', MensajeError,[{
            text: 'Ok',
            onPress: quitarError
        }]);

    }, [ MensajeError ])

    const getPassword = (value : string) => onChange(value, 'password')
    return (
        <>
                   
                <Background />

            <KeyboardAwareScrollView
                contentContainerStyle={ loginStyles.formContainer }
                
            >


            <View style={{marginBottom:25}} > 
                <FoodLogo />

                <Text style={ loginStyles.label }>Email:</Text>
                <Input 
                    placeholder="Ingrese su email"
                    placeholderTextColor="rgba(255,80,40,0.3)"
                    inputContainerStyle={loginStyles.inputField}
                    leftIcon={<Ionicons size={24} color={"#FD801E"} 
                    type={'font-awesome'} name="person"/>}
                    keyboardType="email-address"
                    selectionColor="black"
                    errorMessage={errorEmail}
                    onChangeText = {(value) => onChange(value, 'email')}
                    value={email}
                    onSubmitEditing={ onLogin }

                autoCapitalize="none"
                    autoCorrect={ false }
                />
                 <Text style={ loginStyles.label }>Contraseña:</Text>

                 <InputPassword errorMessage={errorPassword} onSubmitediting= {onLogin} getPass={getPassword} pass={password} secureTextEntry={hidePassword} onPress={() => setHidePassword(!hidePassword)} />
                 
                {/* Olvide contrasenia */}  
               
                <View style={ loginStyles.rememberPassContainer  }>
                            <TouchableOpacity
                                activeOpacity={ 0.8 }
                                onPress={ () => navigation.navigate('RecoverPasswordScreen') }
                            >
                                <Text style={ loginStyles.buttonText }>¿Olvidaste tu contraseña? </Text>
                            </TouchableOpacity>
                </View> 
                
                </View>
                {/* Boton login */}
                <View style={ loginStyles.buttonContainer }>
                            <TouchableOpacity
                                activeOpacity={ 0.8 }
                                style={ loginStyles.button }
                                onPress={ onLogin }
                            >
                                <Text style={ loginStyles.buttonText } >Ingresar</Text>
                            </TouchableOpacity>
                </View>

                {/* Boton Nueva cuenta */}        
                <View style={ loginStyles.buttonContainer  }>
                            <TouchableOpacity
                                activeOpacity={ 0.8 }
                                style={loginStyles.buttonRegistrar}
                                onPress={ () => navigation.navigate('RegisterScreen') }
                            >
                                <Text style={ loginStyles.buttonTextRegistrar }>Registrarse </Text>
                            </TouchableOpacity>
                </View>

                            
            
            </KeyboardAwareScrollView>
        </>
    )
}

