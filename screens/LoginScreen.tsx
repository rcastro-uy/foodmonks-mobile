import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableHighlight, DrawerLayoutAndroid, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Image, Keyboard } from "react-native";
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

interface Props extends StackScreenProps<any, any> {}

export default function LoginScreen({navigation}:Props) {
    const [hidePassword, setHidePassword] = useState(false)
    
    const { email, password, onChange } = useForm({
        email: '',
        password: '' 
     });

     const { iniciarSesion } = useContext( AuthContext );

     const onLogin = () => {
        console.log({email, password});
        Keyboard.dismiss();
        iniciarSesion({ email, password });
    }

    const getPassword = (value : string) => onChange(value, 'password')
    return (
        <>
                   
                <Background />

            <KeyboardAwareScrollView
                contentContainerStyle={ loginStyles.formContainer }
                
            >


            <View  > 
                <FoodLogo />

                <Text style={ loginStyles.title }>Iniciar Sesion</Text>
                <Text style={ loginStyles.label }>Email:</Text>
                <Input 
                    placeholder="Ingrese su email"
                    placeholderTextColor="rgba(255,80,40,0.3)"
                    inputContainerStyle={loginStyles.inputField}
                    leftIcon={<Ionicons size={24} color={"#FD801E"} 
                    type={'font-awesome'} name="person"/>}
                    keyboardType="email-address"
                    selectionColor="black"

                    onChangeText = {(value) => onChange(value, 'email')}
                    value={email}
                    onSubmitEditing={ onLogin }

                autoCapitalize="none"
                    autoCorrect={ false }
                />
                 <Text style={ loginStyles.label }>Contraseña:</Text>
                 <InputPassword  onSubmitediting= {onLogin} getPass={getPassword} pass={password} secureTextEntry={hidePassword} onPress={() => setHidePassword(!hidePassword)} />
                 
                
                
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
                                onPress={ () => navigation.replace('HomeDrawer') }
                            >
                                <Text style={ loginStyles.buttonTextRegistrar }>Registrarse </Text>
                            </TouchableOpacity>
                </View>

                 {/* Olvide contrasenia */}  
               
                <View style={ loginStyles.rememberPassContainer  }>
                            <TouchableOpacity
                                activeOpacity={ 0.8 }
                                onPress={ () => navigation.replace('HomeDrawer') }
                            >
                                <Text style={ loginStyles.buttonText }>Olvide mi contraseña </Text>
                            </TouchableOpacity>
                </View>            
            </View>
            </KeyboardAwareScrollView>
        </>
    )
}

