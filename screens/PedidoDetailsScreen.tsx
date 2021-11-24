import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, Card, Icon, Image } from 'react-native-elements';
import { MenuCompraComp } from '../components/MenuCompraComp';
import { RootStackParams } from '../navigation/StackNavigator';
import { pedidoDetailsStyles } from '../theme/PedidoDetailsTheme';

interface Props extends StackScreenProps<RootStackParams, 'PedidoDetailsScreen'>{};
const {width : width} = Dimensions.get('screen');
export default function PedidoDetailsScreen({navigation, route}:Props) {

    const [cantidad, setCantidad] = React.useState<number>(0);
    
    useEffect(() => {
        navigation.setOptions({
            title:'Pedido',
            headerTitleAlign:'center',
            headerShown: true,
            headerBackTitle: 'Atras',
            headerBackTitleStyle:{color:'black'},
            headerTintColor: 'black',
        })
        //setCantidad(0)
    }, [])

    //const { agregarProducto} = useContext( CarritoContext );

    const idPedido = route.params.idPedido;
    const estadoPedido = route.params.estadoPedido;
    const calificacionRestaurante = route.params.calificacionRestaurante; //Es true si el restaurante ya tiene calificacion
    const menus = route.params.menus;

    return (
      <>             
        <View style={{flex:0.13, top:50}}>
        <Button
            // icon={
            //     <Icon
            //         name="plus"
            //         type="material-community"
            //         size={25}
            //         color="#FD801E"
            //         style={{alignItems:'center'}}
            //     />
            // }
            type="outline"
            buttonStyle = {pedidoDetailsStyles.button}
            activeOpacity={ 0.8 }
            style={ pedidoDetailsStyles.button }
            //onPress={() => agregarAlCarrito()}
            title = 'Calificar'
            titleStyle= {pedidoDetailsStyles.title}
        />
            <Button
            // icon={
            //     <Icon
            //         name="plus"
            //         type="material-community"
            //         size={25}
            //         color="#FD801E"
            //         style={{alignItems:'center'}}
            //     />
            // }
            type="outline"
            buttonStyle = {pedidoDetailsStyles.button}
            activeOpacity={ 0.8 }
            style={ pedidoDetailsStyles.button }
            //onPress={() => agregarAlCarrito()}
            title = 'Reclamar'
            titleStyle= {pedidoDetailsStyles.title}
        />
        </View>
        <View style={{ flex: 0.7,backgroundColor:"#f2f2f2", marginTop: 30 }}>           
            <View style={{width: width, padding:15, alignItems:'center' }}>
              <Text style={{fontWeight: 'bold', fontSize:20,paddingStart:5}}> Menus</Text>
              <MenuCompraComp vertical={true} productos={menus} width={150} height={250} />         
            </View>
          </View>
    </>
    )
}
