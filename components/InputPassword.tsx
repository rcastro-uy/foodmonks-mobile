import React from 'react'
import {StyleSheet, TouchableOpacity, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { loginStyles } from '../theme/LoginTheme';

interface Props {
  errorMessage: string,
  onSubmitediting : any,
  getPass : any,
  pass: string,
  onPress : any,
  secureTextEntry : boolean,
}
export default function InputPassword(props : Props){

    return (
        <Input 
        placeholder="Ingrese su contraseña"
        placeholderTextColor="rgba(255,80,40,0.3)"
        inputContainerStyle={loginStyles.inputField}
        leftIcon={<Ionicons size={24} color={"#FD801E"} 
        type={'font-awesome'} name="lock-closed"/>}
        selectionColor="gray"
        rightIcon={
        <TouchableOpacity activeOpacity = { 0.8 } style={loginStyles.btnVisibility} onPress = {props.onPress}>
        <Image style={ loginStyles.btnImage}  
        source = { (props.secureTextEntry) ? require('../images/hidePassword.png') : require('../images/viewPassword.png')}/>
        </TouchableOpacity>}
        secureTextEntry={props.secureTextEntry}
        errorMessage={props.errorMessage}
        //value={props.value}
        onChangeText = {(value) => props.getPass(value)}
        value={props.pass}
        onSubmitEditing = {props.onSubmitediting}
        


    autoCapitalize="none"
        autoCorrect={ false }
    />
    )
}

