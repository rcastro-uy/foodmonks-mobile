import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import {Dimensions, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable'
import { Button, Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper'
import { AddressContext } from '../context/AddressContext';
import { CarritoContext } from '../context/CarritoContext';
import { RestaurantesContext } from '../context/RestaurantesContext';
import { Restaurante, menuPedido } from '../interfaces/AppInterfaces';
import { RootStackParams } from '../navigation/StackNavigator';
import { confirmOrderStyles } from '../theme/ConfirmOrderTheme'

interface Props extends StackScreenProps<RootStackParams, 'ConfirmOrderScreen'> {}
const {width,height} = Dimensions.get('screen');
export default function ConfirmOrderScreen({navigation, route}: Props) {

    const idRestaurante = route.params.id;

    const [checked, setChecked] = useState('contado');
    let menus: menuPedido[] =[];
    const [restaurante, setRestaurante] = useState<Restaurante | undefined>();
    const {direccionSeleccionada} = useContext( AddressContext );
    const { obtenerRestaurante} = useContext( RestaurantesContext );
    const { listarProductos, calcularTotal } = useContext( CarritoContext );
    
    useEffect(() => {
        navigation.setOptions({
            title:'Resumen',
            headerTitleAlign:'center',
            headerShown: true,
            headerBackTitle: 'Atras',
            headerBackTitleStyle:{color:'black'},
            headerTintColor: 'black',
            headerTitleStyle:({color:'white'}),
            headerStyle:({backgroundColor:'#FD801E'}),
          })
        setRestaurante(obtenerRestaurante(idRestaurante))
    }, [])

    const pay = async () => {
       
        if (checked == "contado"){

            navigation.navigate('ProcessOrderScreen',{'restaurante':restaurante!.correo, 'direccion':direccionSeleccionada!.id ,'medioPago': 'EFECTIVO' , 'ordenId': '', 'linkAprobacion':'', 'total': calcularTotal().total, 'menus': menus });
    
        } else{
            navigation.navigate('PaymentScreen',{'restaurante':restaurante!.correo, 'direccion':direccionSeleccionada!.id ,'menus': menus ,'total':calcularTotal().total});
        }
        
         
        }
      
    return (
        <ScrollView>
        <View style={[confirmOrderStyles.container,{flexDirection:'row'}]}>
            <Image resizeMode={"cover"} style={{margin:10 ,width:50,height:50, overflow: "hidden", borderRadius:50/2}} source={{uri: restaurante?.imagen}} />
                         
        <Text style={{fontSize:19,  fontWeight: 'bold', justifyContent:'flex-end'}}> {restaurante?.nombreRestaurante}</Text>
        </View>

        <View style={confirmOrderStyles.containerDetalles}>
     
        {
            listarProductos().productos.map((producto,index) =>{
                const menu= {
                    id: producto.producto.id,
                    cantidad: producto.cantidad
                }
                menus.push(menu)
                return(
                <View key={index} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={{margin:5, fontSize:15, fontWeight:'bold'}} > {producto.producto.nombre} X{producto.cantidad}</Text>
                    <Text style={{margin:5, fontSize:15, fontWeight:'bold'}}> ${producto.cantidad* ((producto.producto.price*(100-producto.producto.multiplicadorPromocion))/100)}</Text>
                </View>
                )     
            })       
        }
                <View style={{borderTopWidth:1}} />
                    <Text style={{margin:5, textAlign:'right', fontSize:15, fontWeight:'bold'}}> ${calcularTotal().total}</Text>           
                </View>
        
        <Text style={ confirmOrderStyles.title}>Direccion de envio:</Text>
        <View style={confirmOrderStyles.containerAddress}>
          <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:15, alignSelf:'center', fontWeight: 'bold'}}>{direccionSeleccionada?.calle + " " + direccionSeleccionada?.numero + "  (" + direccionSeleccionada?.detalles + ")"} </Text>  
        </View>

        <Text style={ confirmOrderStyles.title}>Metodo de pago:</Text>
        <View style={confirmOrderStyles.containerRadioButton}>
            <View style={{flexDirection:'row', alignItems:"center", paddingHorizontal:20}} >
            <TouchableOpacity activeOpacity={ 0.5 } onPress={() => setChecked('contado')}><Text>Contado</Text></TouchableOpacity>
                <RadioButton
                value="contado"
                uncheckedColor="#FD801E"
                color="#FD801E"
                status={ checked === 'contado' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('contado')}
                />
            </View>
            <View style={{flexDirection:'row', alignItems:'center',paddingHorizontal:20}} >
            <TouchableOpacity activeOpacity={ 0.5 } onPress={() => setChecked('paypal')}><Text>Paypal</Text></TouchableOpacity>
                <RadioButton
                value="paypal"
                uncheckedColor="#FD801E"
                color="#FD801E"
                status={ checked === 'paypal' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('paypal')}
                />
            </View>    
        </View>
        
        <Button
                icon={
                    <Icon
                      name="check-bold"
                      type="material-community"
                      size={25}
                      color="white"
                      style={{alignItems:'center'}}
                    />
                }                       
                buttonStyle = {confirmOrderStyles.button}
                activeOpacity={ 0.8 }
                style={ confirmOrderStyles.button }
                onPress={pay}
                title = 'Enviar pedido'
                titleStyle= {confirmOrderStyles.titleButton}
        />
    </ScrollView>
    )
}


