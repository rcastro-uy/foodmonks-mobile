import React, { useContext, useEffect, useState } from "react"
import { View,Image, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert} from "react-native"
import { AuthContext } from "../context/AuthContext";
import { profileStyles } from '../theme/ProfileTheme';
import { Icon } from "react-native-elements";
import Modal from "../components/Modal";
import ChangeNameLastName from "../components/ChangeNameLastName";
import ChangePassword from "../components/ChangePassword";
import {Rating} from 'react-native-elements';
import Toast from "react-native-easy-toast";


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
     
      
    const generarOpciones = () => {
        return [
            {
                title : "Modificar informacion personal",
                iconNameLeft: "account-circle",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                index: "1",
                opcion:"modificarInfo"
            },
            {
                title : "Modificar Contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                index:"2",
                opcion:"modificarContraseña"
            },
        ]
    }

    const opciones = generarOpciones();

    const seleccionarOpcion = (key: string) => {
        switch (key) {
            case "modificarInfo":
                setRenderComponent(
                    <ChangeNameLastName
                    toastRef={toastRef} setMostrarModal={setMostrarModal} setRefrescar ={setRefrescar}
                    />
                )
                break;
            case "modificarContraseña":
                setRenderComponent(
                    <ChangePassword
                    setMostrarModal={setMostrarModal}
                /> 
                )
                break;
        }
        setMostrarModal(true)
    }
    
    return (
        <>
        <View style={ profileStyles.container }>
            <Image
                source={ require('../images/profile-icon.png') }
                style={profileStyles.imageProfile}

            />
           <View style={profileStyles.infoUser}>
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

<View>

<Text style={ profileStyles.title }>Mi cuenta</Text>
    <View style={profileStyles.optionContainer}>
        <FlatList
            data={opciones}
            keyExtractor={( p ) => p.index}
            style={profileStyles.menuItem}
            renderItem={({item})=>
            
             <TouchableOpacity onPress={()=>seleccionarOpcion(item.opcion)} style={ profileStyles.containerList } activeOpacity={0.8}>
                
                
            <Icon
                type="material-community"
                name={item.iconNameLeft}
                color={item.iconColorLeft}
            /> 
            <Text style={profileStyles.optionText}>{item.title}</Text> 
            <Icon
                type="material-community"
                name={item.iconNameRight}
                color={item.iconColorRight}
            /> 
            
                </TouchableOpacity>   
        }
        ItemSeparatorComponent = { () =>(
            <View style={profileStyles.separador} />
        )}
        />

        <Modal visible={mostrarModal} setVisible={setMostrarModal}>
                {
                    renderComponent
                }
        </Modal>
    </View>


    <Text style={ profileStyles.title}>Administrar</Text>
      <View style={profileStyles.optionContainer}>
        <TouchableOpacity style={ profileStyles.containerList } activeOpacity={0.8} onPress={()=> {bajarCuenta()} }> 
                <Icon
                    type="material-community"
                    name="delete"
                    color="#a7bfd3"
                /> 
                <Text style={profileStyles.optionText}>Eliminar Cuenta</Text> 
                <Icon
                    type="material-community"
                    name="chevron-right"
                    color="#a7bfd3"
                /> 
        </TouchableOpacity> 
        
      </View> 
     

</View>
<Toast ref={toastRef} position="bottom" opacity={0.9}/>       
 </>       
    )
}