import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Card, Icon, Image } from 'react-native-elements';
import { CarritoContext } from '../context/CarritoContext';
import { RootStackParams } from '../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'ProductDetailsScreen'>{};
const {width,height} = Dimensions.get('screen');
export default function ProductDetailsScreen({navigation, route}:Props) {

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
            style={styles.image}
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
            
            <View style={styles.container}>
            { (producto.multiplicadorPromocion!=0) ?(
             <>
              <Text style={[styles.itemDescripcion, {
                fontWeight: 'bold'
              }]} > {producto.multiplicadorPromocion}%OFF {producto.nombre} </Text>
              <Text style={[styles.itemDescripcion, { fontSize: 15 }]}> {producto.descripcion}</Text>
             
              <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 15, color:"red", textDecorationLine:'line-through'}]}  >{'$ ' + producto.price}</Text>
              <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 22, color:"green" }]}  >{'$ ' + ((producto.price*(100-producto.multiplicadorPromocion))/100).toFixed(0)}</Text>
              </>
              ):
              ( 
               <> 
                <Text style={[styles.itemDescripcion, {
                    fontWeight: 'bold'
                  }]} > {producto.nombre} </Text>
                  <Text style={[styles.itemDescripcion, { fontSize: 15 }]}> {producto.descripcion}</Text>
                 
                <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 22, color:"green" }]}  >{'$ ' + producto.price}</Text>
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
                        buttonStyle = {styles.button}
                        activeOpacity={ 0.8 }
                        style={ styles.button }
                        onPress={() => agregarAlCarrito()}
                        title = 'Agregar al carrito'
                        titleStyle= {styles.title}
                    />
            </View>

                           

       
    
  

    </>
    )
}

const styles = StyleSheet.create({
    image: {
        width:width,
        height:height/2.5,
    },
    container: {
        flex:0.33,
        backgroundColor:'white',
        top:15,
        paddingHorizontal: 11,
        justifyContent:'center',
        marginHorizontal:20,
        borderRadius:10
    },

    itemDescripcion: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
    },
    button: {
        width: 250, 
         backgroundColor:'#FD801E',
         borderRadius: 100,
         alignSelf: 'center'
     },
     title: {
         alignItems: 'center',
         color : 'white'
 
     },
    
});
