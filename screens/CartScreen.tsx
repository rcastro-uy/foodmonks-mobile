import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CarritoContext } from '../context/CarritoContext';
import { RootStackParams } from '../navigation/StackNavigator'
import { Ionicons } from '@expo/vector-icons';
import { Button, Icon } from 'react-native-elements';
import ProductosScreen from './ProductosScreen';
import * as Animatable from 'react-native-animatable';

interface Props extends StackScreenProps<RootStackParams, 'CartScreen'>{};
const {width,height} = Dimensions.get('screen');

export default function CartScreen({navigation, route}:Props) {

    const contextCarrito = useContext(CarritoContext)

    const idRestaurante = route.params.id;
    const nombreRestaurante = route.params.nombre;

    useEffect(() => {
        navigation.setOptions({
            title:'Mi pedido',
            headerTitleAlign:'center',
            headerShown: true,
            headerBackTitle: '',
            headerBackTitleStyle:{color:'black'},
            headerTintColor: 'black',
          })
    }, [])

    const modificarCantidad = (i: number,type : boolean, producto: CarritoContext) => {
        const productoModificado = producto;
        if (type) {
          productoModificado.cantidad= productoModificado.cantidad + 1;
         
        } else{
          productoModificado.cantidad= productoModificado.cantidad - 1;
        }
        contextCarrito.modificarCantidad(i, productoModificado)
        
      }
      
      if(contextCarrito.listarProductos().productos.length==0){
          return (
            <View style={styles.imageCarrito}>
            <Animatable.Image
              animation="swing"
              easing="ease-out"
              iterationCount="infinite"
              style={{
                width: '80%',
                height: 250,
                padding: 10,
                resizeMode: 'contain'
              }}
              source={require('../images/carritoVacio.png')}
            />
          </View>
          )
      }
    
        return (
            <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
               <View style={{height:10}} />
      
               <View style={{flex:1}}>
      
                 <ScrollView>
      
                   {
                     contextCarrito.listarProductos().productos.map((item, i)=>{
                       return(
                         <View key={item.producto.nombre} style={{width:width-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                           <Image resizeMode={"contain"} style={{width:width/3,height:width/3}} source={{uri: item.producto.imagen}} />
                           <View style={{flex:1, padding:10, justifyContent:"space-between"}}>
                             <View>
                               <Text style={{fontWeight:"bold", fontSize:20}}>{item.producto.nombre}</Text>
                               <Text style={{color: '#000000', fontSize:15}}>{item.producto.descripcion}</Text>
                             </View>
                             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                               { (item.producto.multiplicadorPromocion!=0) ?(
                                        <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>${(((item.producto.price*(100-item.producto.multiplicadorPromocion))/100)* item.cantidad).toFixed(0)}</Text>
                                ):
                                (       <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>${item.producto.price * item.cantidad}</Text>
                                )}
                               <View style={{flexDirection:'row', alignItems:'center'}}>
                                 <TouchableOpacity onPress={()=>modificarCantidad(i,false, item)}>
                                   <Ionicons name="ios-remove-circle" size={35} color='black' />
                                 </TouchableOpacity>
                                 <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.cantidad}</Text>
                                 <TouchableOpacity onPress={()=>modificarCantidad(i,true, item)}>
                                   <Ionicons name="ios-add-circle" size={35} color='black' />
                                 </TouchableOpacity>
                               </View>
                             </View>
                           </View>
                         </View>
    
                         
                       )
                     })
                   }
      
                       <Text style={{fontSize:28, alignSelf:'center', color:"green"}}>${contextCarrito.calcularTotal().total} </Text>
    
    
                  
                   <View style={{height:20}} />
      
                   <Button
                        type="outline"
                        buttonStyle = {styles.button}
                        activeOpacity={ 0.8 }
                        style={ styles.button }
                        onPress={() => navigation.navigate('ProductosScreen',{'id':idRestaurante, 'nombre':nombreRestaurante })}
                        title = 'Seguir comprando'
                        titleStyle= {styles.title}
                    />
                   <View style={{height:20}} />
                 </ScrollView>
               </View>
               
               <TouchableOpacity style={{
                       backgroundColor:"#FD801E",
                       width:width-40,
                       alignItems:'center',
                       padding:10,
                       borderRadius:30,
                       margin:20
                     }}
                     onPress={()=> navigation.navigate('ConfirmOrderScreen',{'id':idRestaurante})}>
                     <Text style={{
                         fontSize:24,
                         fontWeight:"bold",
                         color:'white'
                       }}>
                       Continuar
                     </Text>
                   </TouchableOpacity>
      


            </View>
          );
}

const styles = StyleSheet.create({
    button: {
        width: 250, 
        borderWidth: 2,
        borderColor: '#FD801E',
         borderRadius: 100,
         alignSelf: 'center'
     },
     title: {
         alignItems: 'center',
         color : '#FD801E',
         fontSize:20,
         fontWeight:"bold",
     },
     imageCarrito: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
     }
    
});
