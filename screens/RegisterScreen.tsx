import React, { useState } from 'react'
import { Keyboard, View, Text, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input } from "react-native-elements";
import { Background } from '../components/Background'
import { FoodLogo } from '../components/FoodLogo'
import { useForm } from '../hooks/useForm'
import { registerStyles } from '../theme/RegisterTheme'
import { Ionicons , MaterialCommunityIcons, Entypo  } from '@expo/vector-icons';
import InputPassword from '../components/InputPassword';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}:Props) => {
    
    const [hidePassword, setHidePassword] = useState(true)

    const { nombre, apellido, calle, numCasa,esquina,observacion, email, password, onChange } = useForm({
        nombre: '',
        apellido: '',
        calle: '',
        numCasa: '',
        esquina: '',
        observacion: '',
        email: '',
        password: ''
     });

     const onRegister = () => {
        console.log({nombre,apellido,calle,numCasa,esquina,observacion,email, password});
        Keyboard.dismiss();
    }
    const getPassword = (value : string) => onChange(value, 'password')
    return (
        <>
                   
        <Background />
    <View style={ registerStyles.headerContainer } >    
        <FoodLogo />

        <Text style={ registerStyles.title }>Nueva Cuenta</Text>
    </View>
    <KeyboardAwareScrollView
        contentContainerStyle={ registerStyles.formContainer }
        
    >


    <View style={{marginBottom:25}} > 
        

        <Text style={ registerStyles.label }>Nombre:</Text>
        <Input 
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Ionicons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="person"/>}
            selectionColor="white"

            onChangeText = {(value) => onChange(value, 'nombre')}
            value={nombre}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ registerStyles.label }>Apellido:</Text>
        <Input 
            placeholder="Ingrese su apellido"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Ionicons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="person"/>}
            selectionColor="white"

            onChangeText = {(value) => onChange(value, 'apellido')}
            value={apellido}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ registerStyles.label }>Calle:</Text>
        <Input 
            placeholder="Ingrese calle"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="white"

            onChangeText = {(value) => onChange(value, 'calle')}
            value={calle}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ registerStyles.label }>Numero de casa:</Text>
        <Input 
            placeholder="Ingrese numero"
            keyboardType='numeric'
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="white"

            onChangeText = {(value) => onChange(value, 'numCasa')}
            value={numCasa}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ registerStyles.label }>Esquina:</Text>
        <Input 
            placeholder="Ingrese esquina"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="white"

            onChangeText = {(value) => onChange(value, 'esquina')}
            value={esquina}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ registerStyles.label }>Observacion:</Text>
        <Input 
            placeholder="Ingrese observacion"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="white"

            onChangeText = {(value) => onChange(value, 'observacion')}
            value={observacion}

        autoCapitalize="words"
            autoCorrect={ false }
        />  

        <Text style={ registerStyles.label }>Email:</Text>
        <Input 
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<MaterialCommunityIcons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="email-plus"/>}
            keyboardType="email-address"
            selectionColor="white"

            onChangeText = {(value) => onChange(value, 'email')}
            value={email}

        autoCapitalize="none"
            autoCorrect={ false }
        />
         <Text style={ registerStyles.label }>Contraseña:</Text>
         <InputPassword  onSubmitediting= {onRegister} getPass={getPassword} pass={password} secureTextEntry={hidePassword} onPress={() => setHidePassword(!hidePassword)} />
 
        
        </View>
        {/* Boton Crear cuenta */}
        <View style={ registerStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        style={ registerStyles.button }
                        onPress={ onRegister }
                    >
                        <Text style={ registerStyles.buttonText } >Crear cuenta</Text>
                    </TouchableOpacity>
        </View>

        {/* Boton iniciar sesion         
        <TouchableOpacity
                        onPress={ () => navigation.replace('Login') }
                        activeOpacity={ 0.8 }
                        style={ registerStyles.buttonReturn }
                    >
                        <Text style={ registerStyles.buttonText  }>Iniciar Sesion</Text>
        </TouchableOpacity> */}

                    
    
    </KeyboardAwareScrollView>
</>
    )
}
