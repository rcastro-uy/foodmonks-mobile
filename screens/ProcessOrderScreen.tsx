import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { RootStackParams } from '../navigation/StackNavigator';
import { realizarPedido } from '../api/actions';
import * as Animatable from 'react-native-animatable';
import { CarritoContext } from '../context/CarritoContext';

const {width,height} = Dimensions.get('screen');
interface Props extends StackScreenProps<RootStackParams, 'ProcessOrderScreen'>{};

export default function ProcessOrderScreen({route, navigation}: Props) {

    const total = route.params.total;
    const restaurante = route.params.restaurante;
    const direccion = route.params.direccion;
    const menus = route.params.menus;
    const ordenId = route.params.ordenId;
    const linkAprobacion = route.params.linkAprobacion;
    const medioPago = route.params.medioPago

    const {vaciarCarrito} = useContext(CarritoContext)

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        realizarPedido(restaurante, direccion,medioPago,ordenId,linkAprobacion,total,menus)
        .then((res) => {
          setTimeout(() => {   
            if (isMounted) {
                setLoading(false);
                isMounted = false;
            }
       
            setTimeout(() => {
                
                navigation.navigate('HomeDrawer')
                vaciarCarrito()
            },3500);
          },3000 ); 
        })
        .catch((error) => {
            Alert.alert("Ocurrio un error", error.response.data || "por favor, vuelva a intentar ", [
                {
                  text: "Ok",
                  onPress: () => {vaciarCarrito(), navigation.navigate('HomeDrawer')},
                  style: "cancel"
                },
               
              ]);
          });
          return () => { isMounted = false };
    }, [])
    return loading==true ? (
        <View style={styles.image}>
            <Animatable.Image
              animation="bounce"
              easing="ease-out"
              iterationCount="infinite"
              style={{
                width: '80%',
                height: 250,
                padding: 10,
                resizeMode: 'contain'
              }}
              source={require('../images/procesandoPedido.png')}
            />
          </View>
    ):(
        <View style={styles.image}>
            <Animatable.Image
              animation="slideInLeft"
              easing="ease-out"
              style={{
                width: '80%',
                height: 250,
                padding: 10,
                resizeMode: 'contain'
              }}
              source={require('../images/pedidoExitoso.png')}
            />
          </View>
    )

}

const styles = StyleSheet.create({
     title: {
         alignItems: 'center',
         color : '#FD801E',
         fontSize:20,
         fontWeight:"bold",
     },
     image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#FD801E'
     }
    
});

