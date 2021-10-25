import React, { useState } from 'react'
import { Keyboard, View, Text, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input } from "react-native-elements";
import { Background } from '../components/Background'
import { FoodLogo } from '../components/FoodLogo'
import { useForm } from '../hooks/useForm'
import { loginStyles } from '../theme/LoginTheme'
import { Ionicons , MaterialCommunityIcons, Entypo  } from '@expo/vector-icons';
import InputPassword from '../components/InputPassword';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}:Props) => {
    
    const [hidePassword, setHidePassword] = useState(true)

    const { nombre, email, password, onChange } = useForm({
        nombre: '',
        email: '',
        password: '' 
     });

     const onRegister = () => {
        console.log({email, password});
        Keyboard.dismiss();
    }
    const getPassword = (value : string) => onChange(value, 'password')
    return (
        <>
                   
        <Background />

    <KeyboardAwareScrollView
        contentContainerStyle={ loginStyles.formContainer }
        
    >


    <View style={{marginBottom:25}} > 
        <FoodLogo />

        <Text style={ loginStyles.title }>Nueva Cuenta</Text>

        <Text style={ loginStyles.label }>Nombre:</Text>
        <Input 
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={loginStyles.inputField}
            leftIcon={<Ionicons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="person"/>}
            selectionColor="black"

            onChangeText = {(value) => onChange(value, 'nombre')}
            value={nombre}

        autoCapitalize="words"
            autoCorrect={ false }
        />
        

        <Text style={ loginStyles.label }>Apellido:</Text>
        <Input 
            placeholder="Ingrese su apellido"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={loginStyles.inputField}
            leftIcon={<Ionicons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="person"/>}
            selectionColor="black"

            onChangeText = {(value) => onChange(value, 'nombre')}
            value={nombre}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ loginStyles.label }>Apellido:</Text>
        <Input 
            placeholder="Ingrese su apellido"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={loginStyles.inputField}
            leftIcon={<Ionicons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="person"/>}
            selectionColor="black"

            onChangeText = {(value) => onChange(value, 'nombre')}
            value={nombre}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ loginStyles.label }>Calle:</Text>
        <Input 
            placeholder="Ingrese calle"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={loginStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="black"

            onChangeText = {(value) => onChange(value, 'nombre')}
            value={nombre}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ loginStyles.label }>Numero de casa:</Text>
        <Input 
            placeholder="Ingrese numero"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={loginStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="black"

            onChangeText = {(value) => onChange(value, 'nombre')}
            value={nombre}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ loginStyles.label }>Esquina:</Text>
        <Input 
            placeholder="Ingrese esquina"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={loginStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="black"

            onChangeText = {(value) => onChange(value, 'nombre')}
            value={nombre}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ loginStyles.label }>Observacion:</Text>
        <Input 
            placeholder="Ingrese observacion"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={loginStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="black"

            onChangeText = {(value) => onChange(value, 'nombre')}
            value={nombre}

        autoCapitalize="words"
            autoCorrect={ false }
        />  

        <Text style={ loginStyles.label }>Email:</Text>
        <Input 
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={loginStyles.inputField}
            leftIcon={<MaterialCommunityIcons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="email-plus"/>}
            keyboardType="email-address"
            selectionColor="black"

            onChangeText = {(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={ onRegister }

        autoCapitalize="none"
            autoCorrect={ false }
        />
         <Text style={ loginStyles.label }>Contraseña:</Text>
         <InputPassword  onSubmitediting= {onRegister} getPass={getPassword} pass={password} secureTextEntry={hidePassword} onPress={() => setHidePassword(!hidePassword)} />
 
        
        </View>
        {/* Boton Crear cuenta */}
        <View style={ loginStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        style={ loginStyles.button }
                        onPress={ onRegister }
                    >
                        <Text style={ loginStyles.buttonText } >Crear cuenta</Text>
                    </TouchableOpacity>
        </View>

        {/* Boton iniciar sesion */}        
        <TouchableOpacity
                        onPress={ () => navigation.replace('Login') }
                        activeOpacity={ 0.8 }
                        style={ loginStyles.buttonReturn }
                    >
                        <Text style={ loginStyles.buttonText  }>Iniciar Sesion</Text>
        </TouchableOpacity>

                    
    
    </KeyboardAwareScrollView>
</>
    )
}
