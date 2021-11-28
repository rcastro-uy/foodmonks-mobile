import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Alert, Dimensions, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Card, Icon, Image } from 'react-native-elements';
import { CarritoContext } from '../context/CarritoContext';
import { RootStackParams } from '../navigation/StackNavigator';
import { productDetailsStyles } from '../theme/PrductDetailsTheme';

interface Props extends StackScreenProps<RootStackParams, 'ProductDetailsScreen'>{};
const {width : width} = Dimensions.get('screen');
export default function ProductDetailsScreen({navigation, route}:Props) {

    const [cantidad, setCantidad] = React.useState<number>(0);
    
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        navigation.setOptions({
            title:'Menu',
            headerTitleAlign:'center',
            headerShown: true,
            headerBackTitle: 'Atras',
            headerBackTitleStyle:{color:'black'},
            headerTintColor: 'black',
            headerTitleStyle:({color:'white'}),
            headerStyle:({backgroundColor:'#FD801E'}),
          })
        setCantidad(0)
    }, [])

    const { agregarProducto} = useContext( CarritoContext );

    const producto = route.params.producto;
    const idRestaurante = route.params.id;
    const nombreRestaurante = route.params.nombre;

    const aumentarCantidad = () =>{
        if (cantidad < 10)
            setCantidad(cantidad+1)
        else
        Alert.alert( 'Cantidad Maxima', 'No se puede agregar mas elementos',[{
            text: 'Ok',
        }]);
    }

    const disminuirCantidad = () =>{
        if (cantidad > 0)
            setCantidad(cantidad-1)
        else
        Alert.alert( ' Error cantidad ', 'No puede ser menor a 0',[{
            text: 'Ok',
        }]);
    }

    const agregarAlCarrito = () =>{
        if (cantidad!=0){
        agregarProducto(producto,cantidad)
        navigation.navigate('ProductosScreen',{'id': idRestaurante, 'nombre':nombreRestaurante})
        }else
        Alert.alert( ' Error cantidad ', 'No puede ser igual a 0',[{
            text: 'Ok',
        }]);
    }

    return (
      <>  
        <View style={{flex:0.47}}>
          <Image
            style={productDetailsStyles.image}
            resizeMode="cover"
            source={{ uri: producto.imagen }}
          />
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
                        onPress={() => {disminuirCantidad()}}
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
                        onPress={() => {aumentarCantidad()}}
                        >
                            <Text style={{fontSize:30}} >+</Text>
                        </TouchableOpacity>
            </View>
        </View>               
            <View style={productDetailsStyles.container}>
            { (producto.multiplicadorPromocion!=0) ?(
             <>
              <Text style={[productDetailsStyles.itemDescripcion, {
                fontWeight: 'bold'
              }]} > {producto.multiplicadorPromocion}%OFF {producto.nombre} </Text>
              <Text style={[productDetailsStyles.itemDescripcion, { fontSize: 15 }]}> {producto.descripcion}</Text>
             
              <Text style={[productDetailsStyles.itemDescripcion, { marginTop: 8, fontSize: 15, color:"red", textDecorationLine:'line-through'}]}  >{'$ ' + producto.price}</Text>
              <Text style={[productDetailsStyles.itemDescripcion, { marginTop: 8, fontSize: 22, color:"green" }]}  >{'$ ' + ((producto.price*(100-producto.multiplicadorPromocion))/100).toFixed(0)}</Text>
              </>
              ):
              ( 
               <> 
                <Text style={[productDetailsStyles.itemDescripcion, {
                    fontWeight: 'bold'
                  }]} > {producto.nombre} </Text>
                  <Text style={[productDetailsStyles.itemDescripcion, { fontSize: 15 }]}> {producto.descripcion}</Text>
                 
                <Text style={[productDetailsStyles.itemDescripcion, { marginTop: 8, fontSize: 22, color:"green" }]}  >{'$ ' + producto.price}</Text>
               </>
              )
            }
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
                        onPress={() => agregarAlCarrito()}
                        title = 'Agregar al carrito'
                        titleStyle= {productDetailsStyles.title}
                    />
            </View>
    </>
    )
}
