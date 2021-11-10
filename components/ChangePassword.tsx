import { Ionicons } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button,Icon,Input } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { registerStyles } from '../theme/RegisterTheme'
import InputPassword from './InputPassword';


export default function ChangePassword({ setMostrarModal } : any) {
    const [hidePassword, setHidePassword] = useState(true)
    const [hidePassword2, setHidePassword2] = useState(true)
    const [hidePassword3, setHidePassword3] = useState(true)
    
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPassword2, setErrorPassword2] = useState("")
    const [errorPassword3, setErrorPassword3] = useState("")
    const [loading, setLoading] = useState(false)
    const { usuario} = useContext( AuthContext );

    const { passActual, passNueva, passNuevaConf, onChange } = useForm({
        passActual: '',
        passNueva: '' ,
        passNuevaConf: ''
     });

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
        setErrorPassword('')
        setErrorPassword2('')
        setErrorPassword3('')

        if(passActual==='') {
            setErrorPassword("Debe ingresar su contraseña.")
            return false
        }
        if(passNueva.length < 6) {
            setErrorPassword2("Debe ingresar una contraseña de al menos seis carácteres.")
            return false
        }
        if(passNuevaConf.length < 6) {
            setErrorPassword3("Debe ingresar la confirmacion de contraseña de al menos seis carácteres.")
            return false
        }
        if(passNueva !== passNuevaConf) {
            setErrorPassword2("La contraseña y la confirmación no son iguales.")
            setErrorPassword3("La contraseña y la confirmación no son iguales.")
            return  false
        }

        return true
    }

    const getPassword = (value : string) => onChange(value, 'passActual')
    const getPassword2 = (value : string) => onChange(value, 'passNueva')
    const getPassword3 = (value : string) => onChange(value, 'passNuevaConf')
    

    return (
        <View style={styles.view}>
             <Text style={ registerStyles.label }>Contraseña actual:</Text>
         <InputPassword errorMessage={errorPassword}  onSubmitediting= {null} getPass={getPassword} pass={passActual} secureTextEntry={hidePassword} onPress={() => setHidePassword(!hidePassword)} />
 
         <Text style={ registerStyles.label }>Contraseña nueva:</Text>
         <InputPassword errorMessage={errorPassword2}  onSubmitediting= {null} getPass={getPassword2} pass={passNueva} secureTextEntry={hidePassword2} onPress={() => setHidePassword2(!hidePassword2)} />
        
         <Text style={ registerStyles.label }>Repetir contraseña nueva:</Text>
         <InputPassword errorMessage={errorPassword3}  onSubmitediting= {null} getPass={getPassword3} pass={passNuevaConf} secureTextEntry={hidePassword3} onPress={() => setHidePassword3(!hidePassword3)} />
 
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