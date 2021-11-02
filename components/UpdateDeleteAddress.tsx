import { REACT_APP_GOOGLE_MAPS_API_KEY } from '@env'
import { Entypo, Ionicons } from '@expo/vector-icons'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button,Input } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { registerStyles } from '../theme/RegisterTheme'
import { Direccione } from '../interfaces/AppInterfaces';

interface props{
 setMostrarModal: any,
 address: Direccione
}

export default function UpdateDeleteAddress({setMostrarModal, address} : props  ) {
    
    const [errorEsquina, setErrorEsquina] = useState("")
    const [loading, setLoading] = useState(Boolean)
    const { usuario} = useContext( AuthContext );

     //Para latitud, longitud calle y numero
     const [lat, setLat] = useState(0)
     const [lng, setLng] = useState(0)
     const [calle, setCalle] = useState("")
     const [numCasa, setNumCasa] = useState("")

    const { esquina,detalles, onChange } = useForm({
        esquina: address.esquina,
        detalles:address.detalles
     });

    
        const ref = useRef<any>();

     useEffect(() => {
        //para sacar la advertencia. De momento es la solucion
       LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
       setLat(parseInt(address.latitud))
       setLng(parseInt(address.longitud))
       ref.current?.setAddressText(address.calle +' '+ address.numero);
     }, [])



    const onSubmit = () => {
        if (!validateForm()) {
            return
        }
        setLoading(true)
        //const result = await updateProfile({ displayName: newDisplayName })
        setLoading(false)


        //setRelodUser(true)
        //toastRef.current.show("Se han actualizado nombres y apellidos.", 3000)
        setMostrarModal(false)
    }

    const validateForm = () => {
        setErrorEsquina('')

        if(esquina==='') {
            setErrorEsquina("Debe ingresar una esquina.")
            return false
        }

        if(lat===0 || lng===0) {
            
            Alert.alert('Error direccion','Debe ingresar una calle y numero de casa')
            return false
        }
        

        return true
    }

    return (
        <ScrollView  keyboardShouldPersistTaps='handled'>
       <View style={styles.view}>
            <Text style={ registerStyles.label }>Direccion:</Text>
        
        <GooglePlacesAutocomplete
            placeholder='Calle y numero de casa' 
            ref={ref}
            styles={{textInput : styles.input }}
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
                
                
                //console.log(details!.address_components[0].long_name)
              }
              else{
                  setLat(0)
                  setLng(0)
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
            selectionColor="white"
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
            selectionColor="white"

            onChangeText = {(value) => onChange(value, 'detalles')}
            value={detalles}

        autoCapitalize="words"
            autoCorrect={ false }
        /> 
            <View style={{flexDirection: "row", padding:20}}>
                <View style={{flex:1}}>
                    <Button
                        icon={
                            <Icon
                              name="pencil"
                              type="material-community"
                              size={25}
                              color="#FD801E"
                              style={{alignItems:'center'}}
                            />
                        }
                        type="outline"
                        buttonStyle = {styles.buttonActualizar}
                        activeOpacity={ 0.8 }
                        style={ styles.buttonActualizar }
                        onPress={ onSubmit }
                        loading= {loading}
                        title = 'Actualizar'
                        titleStyle= {styles.title}
                    />
                </View>

                <View style={{flex:1}}>
                    <Button
                        icon={
                            <Icon
                              name="delete"
                              type="material-community"
                              size={25}
                              color="#FD801E"
                              style={{alignItems:'center'}}
                            />
                        }
                        type="outline"
                        buttonStyle = {styles.buttonEliminar}
                        activeOpacity={ 0.8 }
                        style={ styles.buttonEliminar }
                        onPress={ onSubmit }
                        loading= {loading}
                        title = 'Eliminar'
                        titleStyle= {styles.title}
                    />
                </View>

            </View>

        
                   
        </View>
        </ScrollView>   
    )
}

const styles = StyleSheet.create({
    view: {
        top:-10,
        marginTop:20,
        paddingLeft:10,
        paddingVertical: 10,
        
    },
    buttonActualizar: {
       width: 150, 
        borderColor:'#FD801E',
        borderWidth:2,
        borderRadius: 100,
        
    },
    buttonEliminar: {
        width: 150, 
         borderColor:'#FD801E',
         borderWidth:2,
         borderRadius: 100,
      
     },
    title: {
        alignItems: 'center',
        color : '#FD801E'

    },
    input: {
        fontSize : 16,
        backgroundColor : 'transparent',
        borderBottomWidth: 1,
        borderBottomColor:"black",
        
    },
})
