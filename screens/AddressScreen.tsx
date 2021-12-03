import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/AuthContext";
import { profileStyles } from "../theme/ProfileTheme";
import { Icon, Button } from "react-native-elements";
import Toast from 'react-native-easy-toast'
import AddAddress from '../components/AddAddress';
import Modal from "../components/Modal";
import { Direccione } from "../interfaces/AppInterfaces";
import UpdateDeleteAddress from "../components/UpdateDeleteAddress";
import { AddressContext } from '../context/AddressContext';


export default function AddressScreen({navigation, route}:any) {

    const toastRef = React.useRef<any>()
    const { direcciones} = useContext( AddressContext );
    const [ refrescar, setRefrescar ] = useState( false );
   
    const [renderComponent, setRenderComponent] = useState(<AddAddress />)
    const [mostrarModal, setMostrarModal] = useState(false)

    
    useEffect(() => {
       
        setRefrescar(false)
  },[refrescar])

    let id = 0;

    const agregarDireccion = () => {
        setRenderComponent(
            <AddAddress
            setMostrarModal={setMostrarModal} toastRef={toastRef} setRefrescar={setRefrescar}
        /> 
        )
        setMostrarModal(true)
    }

    const editarDireccion = (item : Direccione) => {
        setRenderComponent(
            <UpdateDeleteAddress
            setMostrarModal={setMostrarModal} toastRef={toastRef} address={item} setRefrescar={setRefrescar}
        /> 
        )
        setMostrarModal(true)
    }
   


    return (
    <>    
    <View style={{top: 25, flex:0.93}}>
     <View style={profileStyles.optionContainer}>
        <FlatList
            data={direcciones}
            keyExtractor={( p, index) => index.toString()}
            style={styles.direccionItem}
            renderItem={({item})=>
            
                <TouchableOpacity onPress={()=> editarDireccion(item)} style={ styles.containerList } activeOpacity={0.8}>
                
                
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
       
        />
        </View>
        <Modal visible={mostrarModal} setVisible={setMostrarModal}>
                {
                    renderComponent
                }
        </Modal>

    </View>
    <Toast ref={toastRef} position="center" opacity={0.9}/>
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
    },
    direccionItem: {
        bottom: 10,
        shadowColor: 'transparent'
       
    },
    containerList: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 30,
        backgroundColor:"white",
        marginVertical: 10,
        borderRadius:20,
        elevation: 7
    
    },
})