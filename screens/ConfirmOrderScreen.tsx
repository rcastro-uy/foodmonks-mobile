
import { DefaultTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import {Alert, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable'
import { Button, Icon } from 'react-native-elements';
import { List, RadioButton } from 'react-native-paper'
import { AddressContext } from '../context/AddressContext';
import { CarritoContext } from '../context/CarritoContext';
import { RestaurantesContext } from '../context/RestaurantesContext';
import { Restaurante, Direccione, menuPedido } from '../interfaces/AppInterfaces';
import { RootStackParams } from '../navigation/StackNavigator';
import { realizarPedido } from '../services/actions';
import { confirmOrderStyles } from '../theme/ConfirmOrderTheme'

interface Props extends StackScreenProps<RootStackParams, 'ConfirmOrderScreen'> {}
const {width,height} = Dimensions.get('screen');
export default function ConfirmOrderScreen({navigation, route}: Props) {

    const idRestaurante = route.params.id;

    const [checked, setChecked] = useState('contado');
    let menus: menuPedido[] =[];
    const [direccion, setDireccion] = useState<Direccione | null>(null);
    const [restaurante, setRestaurante] = useState<Restaurante | undefined>();
    const [expandir, setExpandir] = useState(false);
    const handlePress = () => setExpandir(!expandir);

    const { direcciones} = useContext( AddressContext );
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
          })
        setRestaurante(obtenerRestaurante(idRestaurante))
    }, [])

    const pay = async () => {
        if (!validateForm()) {
            return
        }

        if (checked == "contado"){

            navigation.navigate('ProcessOrderScreen',{'restaurante':restaurante!.correo, 'direccion':direccion!.id ,'medioPago': 'EFECTIVO' , 'ordenId': '', 'linkAprobacion':'', 'total': calcularTotal().total, 'menus': menus });
    
        } else{
            navigation.navigate('PaymentScreen',{'restaurante':restaurante!.correo, 'direccion':direccion!.id ,'menus': menus ,'total':calcularTotal().total});
        }
        
         
        }
    
        const validateForm = () => {
    
            if(direccion== null) {
                Alert.alert( 'Error', "Debe seleccionar una direccion",[{
                    text: 'Ok'
                }]);
                return false
            }
    
            return true
        }    
    return (
        <>
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
            <List.Section style={{margin:10}} >
                <List.Accordion
                    title={(direccion==null)? ("Seleccionar Direccion") : ( direccion!.calle + " "+ direccion!.numero) }
                    expanded={expandir}
                    theme={{colors:{...DefaultTheme.colors, primary:'#FD801E'}}}
                    onPress={()=> handlePress()}
                    left={props => <List.Icon {...props} icon="map-marker"  />}>
                    {
                        direcciones.map((item,index)=>(
                    <List.Item  key={index} title={item.calle + " " + item.numero}
                    left={props => <List.Icon {...props} icon="map-marker" />}
                    
                    onPress={() => {setDireccion(item), handlePress()}}/>
                    ))}
                </List.Accordion>
            </List.Section>
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
    </>
    )
}


