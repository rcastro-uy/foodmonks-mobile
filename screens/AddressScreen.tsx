import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/AuthContext";
import { profileStyles } from "../theme/ProfileTheme";
import { Icon, Button } from "react-native-elements";
import AddAddress from '../components/AddAddress';
import Modal from "../components/Modal";
import { Direccione } from "../interfaces/AppInterfaces";
import UpdateDeleteAddress from "../components/UpdateDeleteAddress";

export default function AddressScreen({navigation, route}:any) {

    const { usuario } = useContext( AuthContext );

    const [renderComponent, setRenderComponent] = useState(<AddAddress />)
    const [mostrarModal, setMostrarModal] = useState(false)

    const agregarDireccion = () => {
        setRenderComponent(
            <AddAddress
            setMostrarModal={setMostrarModal}
        /> 
        )
        setMostrarModal(true)
    }

    const editarDireccion = (item : Direccione) => {
        setRenderComponent(
            <UpdateDeleteAddress
            setMostrarModal={setMostrarModal} address={item}
        /> 
        )
        setMostrarModal(true)
    }
   


    return (
    <>    
    <View style={{top: 25, flex:0.93}}>
     <View style={profileStyles.optionContainer}>
        <FlatList
            data={usuario?.direcciones}
            keyExtractor={( p, index) => index.toString()}
            style={profileStyles.menuItem}
            renderItem={({item})=>
            
                <TouchableOpacity onPress={()=> editarDireccion(item)} style={ profileStyles.containerList } activeOpacity={0.8}>
                
                
            <Icon
                type="material-community"
                name='map-marker'
                color='#a7bfd3'
            /> 
            <Text style={profileStyles.optionText}>{item.calle} {item.numero}</Text> 
            <Icon
                type="material-community"
                name='chevron-right'
                color='#a7bfd3'
            /> 
            
                </TouchableOpacity>   
        }
        ItemSeparatorComponent = { () =>(
            <View style={profileStyles.separador} />
        )}
        />
        </View>
        <Modal visible={mostrarModal} setVisible={setMostrarModal}>
                {
                    renderComponent
                }
        </Modal>

    </View>
     <View style={{flex:0.07, alignItems:'center'}}>
     <Button
                        icon={
                            <Icon
                              name="plus"
                              type="material-community"
                              size={25}
                              color="white"
                              style={{alignItems:'center'}}
                            />
                        }
                       
                        buttonStyle = {styles.button}
                        activeOpacity={ 0.8 }
                        style={ styles.button }
                        onPress={()=>agregarDireccion()}
                        loading= { null }
                        title = 'Agregar direccion'
                        titleStyle= {styles.title}
                    />
     </View>
    </>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    button: {
       width: 350, 
       borderColor: '#FD801E',
       backgroundColor: '#FD801E',
        borderWidth:2,
        borderRadius: 100,    
    },
    title: {
        alignItems: 'center',
        color : 'white'

    }
})