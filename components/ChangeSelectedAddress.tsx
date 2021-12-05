
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AirbnbRating, Rating, Button, Icon } from 'react-native-elements';
import { List } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { altaCalificacion } from '../api/actions';
import { AddressContext } from '../context/AddressContext';

export default function ChangeSelectedAddress({setMostrarModal} : any) {
    const [text, setText] = useState('');
    const [calificar, setCalificar] = useState(5);
    const [id, setID] = useState('');
    const [loading, setLoading] = useState(false)
    const { direcciones, cambiarDireccionSeleccionada} = useContext( AddressContext );
    
    const cancelar = () => {
        setMostrarModal(false)
        return;
    }

   
    return (
        <>
        <KeyboardAwareScrollView>
        <View style={{margin:5,padding:10}}>
            <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center',bottom:10, width:'100%', borderBottomWidth:1}}>Seleccione una dirección </Text>
            {
            direcciones.map((item,index)=>(
               <TouchableOpacity key={index} activeOpacity={0.8} onPress={()=> {cambiarDireccionSeleccionada(item),setMostrarModal(false)} }> 
                <List.Item
                style={{borderBottomWidth:1,top:10}}
                    title={item.calle + " " + item.numero}
                    left={props => <Icon type='material-community' name='map-marker' />}
                    right={props => <Icon type='material-community' name='chevron-right' />}
                />
               </TouchableOpacity>    
            ))}
            <View style={{flexDirection:'row', top:15,flex:1, justifyContent:'space-evenly'}}>

                    <Button
                        
                        type="outline"
                        buttonStyle = {styles.button}
                        activeOpacity={ 0.8 }
                        style={ styles.button }
                        onPress={cancelar}
                        //loading= {loading}
                        title = 'Cancelar'
                        titleStyle= {styles.title}
                    />
            </View>
        </View>
        </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        top:-10,
        marginTop:20,
        paddingLeft:10,
        paddingVertical: 10,
        
    },
    button: {
       width: 125, 
        borderColor:'#FD801E',
        backgroundColor:'#FD801E',
        borderWidth:1,
        borderRadius: 100,
        alignSelf: 'center'
    },
    title: {
        alignItems: 'center',
        color : 'white'

    },
    input: {
        fontSize : 16,
        backgroundColor : 'transparent',
        borderBottomWidth: 1,
        borderBottomColor:"black",
        
    },
})


