import { Ionicons } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button,Input } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { modificarPerfil } from '../api/actions'
import { registerStyles } from '../theme/RegisterTheme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddressContext } from '../context/AddressContext'


export default function ChangeNameLastName({toastRef, setMostrarModal, setRefrescar } : any) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [errorNombre, setErrorNombre] = useState("")
    const [errorApellido, setErrorApellido] = useState("")
    const [loading, setLoading] = useState(false)  

    const { nombre, apellido, onChange } = useForm({
        nombre: '',
        apellido: '' 
     });

    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }
       
        setLoading(true)
        const resp = await modificarPerfil(nombre,apellido)
        setLoading(false)

        if (!resp){
            return
        }
        setRefrescar(true)
        toastRef.current.show("Se han actualizado nombre y apellido.", 3000)
        setMostrarModal(false)
    }

    const validateForm = () => {
        setErrorNombre('')
        setErrorApellido('')

        if(nombre==='') {
            setErrorNombre("Debe ingresar su nombre.")
            return false
        }
        if(apellido==='') {
            setErrorApellido("Debe ingresar su apellido.")
           return false
        }

        return true
    }

    return (
        <View style={styles.view}>
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
                        buttonStyle = {styles.button}
                        activeOpacity={ 0.8 }
                        style={ styles.button }
                        onPress={ onSubmit }
                        loading= {loading}
                        title = 'Actualizar'
                        titleStyle= {styles.title}
                    />
                    
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    button: {
       width: 150, 
        borderColor:'#FD801E',
        borderWidth:2,
        borderRadius: 100,    
    },
    title: {
        alignItems: 'center',
        color : '#FD801E'

    }
})
