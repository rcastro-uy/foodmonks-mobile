import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Card, Icon, Image } from 'react-native-elements';
import { CarritoContext } from '../context/CarritoContext';
import { RootStackParams } from '../navigation/StackNavigator';
import { productDetailsStyles } from '../theme/PrductDetailsTheme';

interface Props extends StackScreenProps<RootStackParams, 'PedidoDetailsScreen'>{};
const {width : width} = Dimensions.get('screen');
export default function PedidoDetailsScreen({navigation, route}:Props) {

    const [cantidad, setCantidad] = React.useState<number>(0);
    
    useEffect(() => {
        navigation.setOptions({
            title:'Menu',
            headerTitleAlign:'center',
            headerShown: true,
            headerBackTitle: 'Atras',
            headerBackTitleStyle:{color:'black'},
            headerTintColor: 'black',
        })
        setCantidad(0)
    }, [])

    //const { agregarProducto} = useContext( CarritoContext );

    const idPedido = route.params.idPedido;
    const estadoPedido = route.params.estadoPedido;
    const restaurante = route.params.restaurante;

    return (
      <>  
        <View style={{flex:0.47}}>
          {/* <Image
            style={productDetailsStyles.image}
            resizeMode="cover"
            source={{ uri: producto.imagen }}
          /> */}
            <View
                style={{
                        position: 'absolute',
                        bottom:0,
                        width: width,
                        height: 50,
                        justifyContent: 'center',
                        flexDirection: 'row'
                }} >
                    <TouchableOpacity
                        style={{
                            width: 50,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopLeftRadius: 25,
                            borderBottomLeftRadius: 25
                        }}
                        activeOpacity={0.8}
                        //onPress={() => {disminuirCantidad()}}
                    >
                        <Text style={{fontSize:30}} >-</Text>
                    </TouchableOpacity>

                        <View
                            style={{
                                width: 50,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text > {cantidad}</Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                width: 50,
                                backgroundColor: 'white',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderTopRightRadius: 25,
                                borderBottomRightRadius: 25
                            }}
                            activeOpacity={0.8}
                        //onPress={() => {aumentarCantidad()}}
                        >
                            <Text style={{fontSize:30}} >+</Text>
                        </TouchableOpacity>
            </View>
        </View>               
            <View style={productDetailsStyles.container}>
               <> 
                <Text style={[productDetailsStyles.itemDescripcion, {
                    fontWeight: 'bold'
                  }]} > {idPedido} </Text>
                  <Text style={[productDetailsStyles.itemDescripcion, { fontSize: 15 }]}> {estadoPedido}</Text>
                 
                <Text style={[productDetailsStyles.itemDescripcion, { marginTop: 8, fontSize: 22, color:"green" }]}  >{'$ ' + restaurante}</Text>
               </>
            </View>
            <View style={{flex:0.13, top:50}}>
            <Button
                        icon={
                            <Icon
                              name="plus"
                              type="material-community"
                              size={25}
                              color="#FD801E"
                              style={{alignItems:'center'}}
                            />
                        }
                        type="outline"
                        buttonStyle = {productDetailsStyles.button}
                        activeOpacity={ 0.8 }
                        style={ productDetailsStyles.button }
                        //onPress={() => agregarAlCarrito()}
                        title = 'Agregar al carrito'
                        titleStyle= {productDetailsStyles.title}
                    />
            </View>
    </>
    )
}
