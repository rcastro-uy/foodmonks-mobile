import React from "react";
import { View, Text, StyleSheet, Button, TouchableHighlight, DrawerLayoutAndroid, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Background } from "../components/Background";
import { FoodLogo } from "../components/FoodLogo";
import { loginStyles } from "../theme/LoginTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen({navigation}:any) {
    return (
        <>
                   
                <Background />

            <KeyboardAwareScrollView
                contentContainerStyle={ (Platform.OS === 'android') ? loginStyles.container: null }
                
            >


            <View style={ loginStyles.formContainer }> 
                <FoodLogo />

                <Text style={ loginStyles.title }>Iniciar Sesion</Text>
                <Text style={ loginStyles.label }>Email:</Text>
                <TextInput 
                    placeholder="Ingrese su email:"
                    placeholderTextColor="rgba(255,80,40,0.3)"
                    keyboardType="email-address"
                    style={loginStyles.inputField}
                    selectionColor="black"

                    


                autoCapitalize="none"
                    autoCorrect={ false }
                />

                <Text style={ loginStyles.label }>Contraseña:</Text>
                <TextInput 
                    placeholder="Ingrese su contraseña:"
                    placeholderTextColor="rgba(255,80,40,0.3)"
                    style={loginStyles.inputField}
                    selectionColor="black"

                    


                        autoCapitalize="none"
                        autoCorrect={ false }
                />
                
                {/* Boton login */}
                <View style={ loginStyles.buttonContainer }>
                            <TouchableOpacity
                                activeOpacity={ 0.8 }
                                style={ loginStyles.button }
                            >
                                <Text style={ loginStyles.buttonText } >Ingresar</Text>
                            </TouchableOpacity>
                </View>

                {/* Nueva cuenta */}        
                <View style={ loginStyles.newUserContainer  }>
                            <TouchableOpacity
                                activeOpacity={ 0.8 }
                                onPress={ () => navigation.replace('HomeDrawer') }
                            >
                                <Text style={ loginStyles.buttonText }>Registrarse </Text>
                            </TouchableOpacity>
                </View>
            </View>
            </KeyboardAwareScrollView>
        </>
    )
}

