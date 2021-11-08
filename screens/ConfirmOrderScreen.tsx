import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useState } from 'react'
import {Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable'
import { Button, Icon } from 'react-native-elements';
import { List, RadioButton } from 'react-native-paper'
import Modal from '../components/Modal'
import { AddressContext } from '../context/AddressContext';
import { confirmOrderStyles } from '../theme/ConfirmOrderTheme'

interface Props extends StackScreenProps<any, any> {}
export default function ConfirmOrderScreen({navigation}: any) {

    const [checked, setChecked] = React.useState('contado');
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    const { direcciones} = useContext( AddressContext );
    
    const pay = () => {
        
           navigation.navigate('PaymentScreen',{'amt':50});
        }
    return (
        <>
        <View style={confirmOrderStyles.container}>
     
        <Text> Info Restaurante</Text>
        </View>

        <View style={confirmOrderStyles.container}>
     
        <Text> Info del pedido</Text>
        <Text> Info del pedido</Text>
        <Text> Info del pedido</Text>
        <Text> Info del pedido</Text>
        <Text> Info del pedido</Text>
        <Text> Info del pedido</Text>
        <Text> Info del pedido</Text>
        
        </View>
        <Text style={ confirmOrderStyles.title}>Direccion de envio:</Text>
        <View style={confirmOrderStyles.containerAddress}>
        <List.Section >
      <List.Accordion
        title="Seleccionar Direccion"
        left={props => <List.Icon {...props} icon="map-marker"  />}>
        {
            direcciones.map((item,index)=>(
        <List.Item  key={index} title={item.calle + item.numero}
        left={props => <List.Icon {...props} icon="map-marker" />}
        onPress={handlePress}/>
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


