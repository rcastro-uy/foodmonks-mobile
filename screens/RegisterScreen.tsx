import React, { useContext, useEffect, useState } from 'react'
import { Buffer } from "buffer"
import { Keyboard, View, Text, TouchableOpacity, Modal, Pressable, Alert, FlatList, SectionList, LogBox } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, Input } from "react-native-elements";
import { Background } from '../components/Background'
import { FoodLogo } from '../components/FoodLogo'
import { useForm } from '../hooks/useForm'
import { registerStyles } from '../theme/RegisterTheme'
import { Ionicons , MaterialCommunityIcons, Entypo  } from '@expo/vector-icons';
import InputPassword from '../components/InputPassword';
import { StackScreenProps } from '@react-navigation/stack';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { validateEmail } from '../utils/helpers';
import { AuthContext } from '../context/AuthContext';
import {REACT_APP_GOOGLE_MAPS_API_KEY} from '@env'

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}:Props) => {
    
    const [hidePassword, setHidePassword] = useState(true)
    const [hidePassword2, setHidePassword2] = useState(true)
    const [loading, setLoading] = useState(Boolean)

    //traigo la funcion que se enceuntra en AuthContext para comunicar con el back
    const { registrarCuenta, MensajeError, quitarError, MensajeOk, quitarMensajeOk} = useContext( AuthContext );


    //Para latitud, longitud calle y numero
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [calle, setCalle] = useState("")
    const [numCasa, setNumCasa] = useState("")

    //para validaciones de inputs
    const [errorNombre, setErrorNombre] = useState("")
    const [errorApellido, setErrorApellido] = useState("")
    const [errorEsquina, setErrorEsquina] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPassword2, setErrorPassword2] = useState("")

   
    useEffect(() => {
         //para sacar la advertencia. De momento es la solucion
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        if (MensajeOk.length != 0){
            Alert.alert( 'Registro Exitoso ', MensajeOk,[{
                text: 'Ok',
                onPress: quitarMensajeOk
            }]);
            navigation.replace('Login')
        }
        if( MensajeError.length === 0 ) return;

        Alert.alert( 'Registro incorrecto ', MensajeError,[{
            text: 'Ok',
            onPress: quitarError
        }]);
      }, [MensajeError, MensajeOk])

     // funcion para validar los inputs 
    const validateData = () => {
        setErrorNombre("")
        setErrorApellido("")
        setErrorEsquina("")
        setErrorEmail("")
        setErrorPassword("")
        setErrorPassword2("")
        let isValid = true
        if(lat===0 || lng===0) {
            Alert.alert('Error direccion','Debe ingresar una calle y numero de casa')
            isValid = false
        }
        if(nombre==='') {
            setErrorNombre("Debe ingresar su nombre.")
            isValid = false
        }
        if(apellido==='') {
            setErrorApellido("Debe ingresar su apellido.")
            isValid = false
        }
        if(esquina==='') {
            setErrorEsquina("Debe ingresar esquina.")
            isValid = false
        }
        if(!validateEmail(email)) {
            setErrorEmail("Debe ingresar un email válido.")
            isValid = false
        }
        if(password.length < 6) {
            setErrorPassword("Debe ingresar una contraseña de al menos seis carácteres.")
            isValid = false
        }
        if(password2.length < 6) {
            setErrorPassword2("Debe ingresar la confirmacion de contraseña de al menos seis carácteres.")
            isValid = false
        }
        if(password !== password2) {
            setErrorPassword("La contraseña y la confirmación no son iguales.")
            setErrorPassword2("La contraseña y la confirmación no son iguales.")
            isValid = false
        }

        return isValid
    }   

    //Se utiliza el hoks de useForm para guardar los datos que ingrese el usuario en los inputs
    const { nombre, apellido,esquina,detalles, email, password, password2, onChange } = useForm({
        nombre: '',
        apellido: '',
        esquina: '',
        detalles: '',
        email: '',
        password: '',
        password2: ''
     });
     
     // Funcion que realiza el boton crear cuenta
     const onRegister = async () => {
        if (!validateData()) {
            Alert.alert("Error", "Verifique datos ingresados")
            return;
        }
        const direccion = {
            calle: calle,
            numero: numCasa,
            esquina: esquina,
            detalles: detalles,
            latitud: lat,
            longitud: lng
        }
        let passBase = Buffer.from(password, "utf8").toString('base64');
        let correo = Buffer.from(email, "utf8").toString('base64');
        setLoading(true)
        await registrarCuenta({nombre,apellido,correo,password : passBase, direccion: direccion})
        setLoading(false)
        Keyboard.dismiss();
    }

    const getPassword = (value : string) => onChange(value, 'password')
    const getPassword2 = (value : string) => onChange(value, 'password2')
    
    return (
        <>
                   
        <Background />
    <View style={ registerStyles.headerContainer } >    
        <FoodLogo />

        <Text style={ registerStyles.title }>Nueva Cuenta</Text>

        <Ionicons 
        type='material-community'
        name='arrow-back-circle'
        size={35}
        color={"#FD801E"}
        onPress={ () => navigation.replace('Login') }
        style={ registerStyles.buttonReturn } />
    </View>

    <KeyboardAwareScrollView
        contentContainerStyle={ registerStyles.formContainer }
        keyboardShouldPersistTaps='always'
    >
        
       <View style={{marginBottom:25}} > 

        <Text style={ registerStyles.label }>Nombre:</Text>
        <Input 
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Ionicons size={24} color={"#FD801E"} 
            type={'font-awesome'} name="person"/>}
            selectionColor="gray"
            errorMessage={errorNombre}
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
            selectionColor="gray"
            errorMessage={errorApellido}
            onChangeText = {(value) => onChange(value, 'apellido')}
            value={apellido}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ registerStyles.label }>Direccion:</Text>
        <GooglePlacesAutocomplete
            placeholder='Calle y numero de casa' 
            styles={{textInput : registerStyles.inputGooglePlace }}
            fetchDetails = {true}
            keyboardShouldPersistTaps = 'always'
            enablePoweredByContainer = {false}
            listViewDisplayed = {false}
            onPress={(data,details) => {
              if (details!.address_components[0].types[0] === 'street_number' && details!.address_components[1].types[0] === 'route' ){    
                setCalle(details!.address_components[1].long_name)
                setNumCasa(details!.address_components[0].long_name)
                setLat(details!.geometry.location.lat);
                setLng(details!.geometry.location.lng);
    
              }
            }}
            query={{
                key: REACT_APP_GOOGLE_MAPS_API_KEY,
                language: 'en',
                components: 'country:uy'
            }}
        />

        <Text style={ registerStyles.label }>Esquina:</Text>
        <Input 
            placeholder="Ingrese esquina"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="gray"
            errorMessage={errorEsquina}
            onChangeText = {(value) => onChange(value, 'esquina')}
            value={esquina}

        autoCapitalize="words"
            autoCorrect={ false }
        />

        <Text style={ registerStyles.label }>Detalles:</Text>
        <Input 
            placeholder="Ingrese detalles"
            placeholderTextColor="rgba(255,80,40,0.3)"
            inputContainerStyle={registerStyles.inputField}
            leftIcon={<Entypo  size={24} color={"#FD801E"} 
            type={'font-awesome'} name="address"/>}
            selectionColor="gray"

            onChangeText = {(value) => onChange(value, 'detalles')}
            value={detalles}

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
            selectionColor="gray"
            errorMessage={errorEmail}
            onChangeText = {(value) => onChange(value, 'email')}
            value={email}

        autoCapitalize="none"
            autoCorrect={ false }
        />
         <Text style={ registerStyles.label }>Contraseña:</Text>
         <InputPassword errorMessage={errorPassword}  onSubmitediting= {null} getPass={getPassword} pass={password} secureTextEntry={hidePassword} onPress={() => setHidePassword(!hidePassword)} />
 
         <Text style={ registerStyles.label }>Repetir contraseña:</Text>
         <InputPassword errorMessage={errorPassword2}  onSubmitediting= {onRegister} getPass={getPassword2} pass={password2} secureTextEntry={hidePassword2} onPress={() => setHidePassword2(!hidePassword2)} />
 
                {/* Boton crear cuenta */}
                    <Button
                        type="outline"
                        activeOpacity={ 0.8 }
                        title="Crear cuenta"
                        titleStyle= {registerStyles.buttonText}
                        buttonStyle={ registerStyles.button }
                        onPress={ onRegister }
                        loading={loading}
                    />
                  
        </View>

    </KeyboardAwareScrollView>
</>
    )
}
