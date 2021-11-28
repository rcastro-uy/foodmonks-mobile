import React, { useContext, useEffect, useState } from "react"
import { View,Image, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert} from "react-native"
import { AuthContext } from "../context/AuthContext";
import { profileStyles } from '../theme/ProfileTheme';
import { Icon } from "react-native-elements";
import Modal from "../components/Modal";
import ChangeNameLastName from "../components/ChangeNameLastName";
import {Rating} from 'react-native-elements';
import Toast from "react-native-easy-toast";
import { styles } from '../navigation/CustomDrawerNavigator';


export default function ProfileScreen({navigation}:any) {

    const toastRef = React.useRef<any>()
    const {comprobarToken, usuario, eliminarCuenta, cerrarSesion} = useContext( AuthContext );
    const [mostrarModal, setMostrarModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(<ChangeNameLastName />)
    const [ refrescar, setRefrescar ] = useState( false );

    useEffect(() => {
        comprobarToken()
        setRefrescar(false)
  },[refrescar])

    const bajarCuenta = () => {
        Alert.alert("Estas seguro?", "Si elimina la cuenta, no volvera acceder ", [
            {
              text: "Cancelar",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Eliminar", onPress: () => { eliminarCuenta(), cerrarSesion()} }
          ]);
    }

    const modificarInfo = () => {
        setRenderComponent(
            <ChangeNameLastName
            toastRef={toastRef} setMostrarModal={setMostrarModal} setRefrescar ={setRefrescar}
            />
        )
        setMostrarModal(true)
    }
         
    return (
        <>
        <View style={ profileStyles.container }>
            <Image
                source={ require('../images/profile-icon.png') }
                style={profileStyles.imageProfile}

            />
           <View style={{paddingStart:15}}>
                <Text style={profileStyles.displayName}>
                    {
                        usuario?.nombre 
                    }
                </Text>
                <Text>{usuario?.correo}</Text>
                <View style={{top:15}}>
                <Text style={{fontWeight: "bold", bottom:5}}>Fecha de registro: {usuario?.fechaRegistro}</Text>
                    <Text style={{fontWeight: "bold", bottom:5}}>Mi valoracion: {usuario?.calificacion}/5</Text>
                    <Rating  fractions="{1}"  imageSize={20}  showRating={false} startingValue={usuario?.calificacion.toString()} />
                    {(usuario!.cantidadCalificaciones <10 )?
                        ( <Text style={{borderWidth:0,padding:2, color:'#FD801E',fontWeight: "bold", backgroundColor:'#8CF9E5', alignSelf:'flex-start' }}>Nuevo</Text> ) : (null)
                    }
                   
                </View>
            </View>
        </View>

<View style={{top:30}}>

<Text style={ profileStyles.title }>Administrar</Text>
    <View style={profileStyles.optionContainer}>
    <TouchableOpacity style={ [profileStyles.containerList,{borderBottomWidth:1}] } activeOpacity={0.8} onPress={()=> {modificarInfo()} }> 
                <Icon
                    type="material-community"
                    name="account-circle"
                    color="#a7bfd3"
                /> 
                <Text style={profileStyles.optionText}>Modificar informacion personal</Text> 
                <Icon
                    type="material-community"
                    name="chevron-right"
                    color="#a7bfd3"
                /> 
        </TouchableOpacity> 

        <TouchableOpacity style={ [profileStyles.containerList,{borderBottomWidth:1}] } activeOpacity={0.8} onPress={()=> {bajarCuenta()} }> 
                <Icon
                    type="material-community"
                    name="delete"
                    color="#a7bfd3"
                /> 
                <Text style={profileStyles.optionText}>Eliminar cuenta</Text> 
                <Icon
                    type="material-community"
                    name="chevron-right"
                    color="#a7bfd3"
                /> 
        </TouchableOpacity> 

        <TouchableOpacity style={ [profileStyles.containerList ] } activeOpacity={0.8} onPress={()=> {cerrarSesion()} }> 
                <Icon
                    type="material-community"
                    name="logout"
                    color="#a7bfd3"
                /> 
                <Text style={profileStyles.optionText}>Cerrar sesion</Text> 
                <Icon
                    type="material-community"
                    name="chevron-right"
                    color="#a7bfd3"
                /> 
        </TouchableOpacity> 

        <Modal visible={mostrarModal} setVisible={setMostrarModal}>
                {
                    renderComponent
                }
        </Modal>
    </View>
</View> 
     


<Toast ref={toastRef} position="bottom" opacity={0.9}/>       
 </>       
    )
}