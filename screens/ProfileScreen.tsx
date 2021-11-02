import React, { useContext, useEffect, useState } from "react"
import { View,Image, Text, Button, StyleSheet, FlatList, TouchableOpacity} from "react-native"
import { AuthContext } from "../context/AuthContext";
import { profileStyles } from '../theme/ProfileTheme';
import { Icon } from "react-native-elements";
import Modal from "../components/Modal";
import ChangeNameLastName from "../components/ChangeNameLastName";
import ChangePassword from "../components/ChangePassword";
import { StackScreenProps } from "@react-navigation/stack";

export default function ProfileScreen({navigation}:any) {

    const { usuario} = useContext( AuthContext );
    const [mostrarModal, setMostrarModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(<ChangeNameLastName />)

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
                        setMostrarModal={setMostrarModal}
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
        source={ require('../images/monjeNegro.png') }
        style={profileStyles.imageProfile}
      />
           <View style={profileStyles.infoUser}>
                <Text style={profileStyles.displayName}>
                    {
                        usuario?.firstName 
                    }
                </Text>
                <Text>{usuario?.mail}</Text>
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
        <TouchableOpacity style={ profileStyles.containerList } activeOpacity={0.8}> 
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
            
 </>       
    )
}