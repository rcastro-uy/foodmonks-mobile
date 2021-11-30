import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react"
import { View, Text, TextInput, Button, StyleSheet, Image, Keyboard, LogBox, Dimensions, Alert } from "react-native"
import { Input } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Background } from "../components/Background";
import { RestaurantesContext } from "../context/RestaurantesContext";
import { RootStackParams } from "../navigation/StackNavigator";
import { reclamoStyles } from "../theme/ReclamoTheme";

interface Props extends StackScreenProps<RootStackParams, 'ReclamoScreen'>{};
const {width : width} = Dimensions.get('screen');
export default function ReclamoScreen({navigation, route}:Props) {
    //const [email, setEmail] = React.useState("");
    const [razon, setRazon] = React.useState("");
    const [comentario, setComentario] = React.useState("");
    const { realizarReclamo } = useContext( RestaurantesContext );

    const idPedido = route.params.idPedido;
    const reclamo = route.params.reclamo;

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        navigation.setOptions({
            title:'Reclamo',
            headerTitleAlign:'center',
            headerShown: true,
            headerBackTitle: 'Atras',
            headerBackTitleStyle:{color:'black'},
            headerTintColor: 'black',
        })
        //setRefrescar(false)
    }, [])

    const onRealizarReclamo = () => {
        Keyboard.dismiss();
        if (razon === "") {
            Alert.alert(
                "Reclamo no realizado",
                `Ingrese la razon`,
                [
                    { text: "OK", style: "default" }
                ]
            )
        } else if (comentario === "") {
            Alert.alert(
                "Reclamo no realizado",
                `Ingrese un comentario`,
                [
                    { text: "OK", style: "default" }
                ]
            )
        } else {
            realizarReclamo(idPedido, razon, comentario)
            .then((res) => {
                navigation.goBack();
            })
            .catch((err) => {
                Alert.alert(
                    "Reclamo cancelado",
                    `Error de comunicacion ${err}`,
                    [
                        { text: "OK", style: "default" }
                    ]
                )
            });
        }
    }

    return (
        <>
            <Background />
            <KeyboardAwareScrollView
                contentContainerStyle={ reclamoStyles.formContainer }
            >
                <View style={{marginBottom:25}} >
                    <Text style={ reclamoStyles.label }>Razon</Text>
                    <Input 
                        placeholder="Razon"
                        placeholderTextColor="rgba(255,80,40,0.3)"
                        inputContainerStyle={reclamoStyles.inputField}
                        leftIcon={<Ionicons size={24} color={"#FD801E"} 
                        type={'font-awesome'} name="person"/>}
                        keyboardType="default"
                        selectionColor="black"
                        onChangeText = {setRazon}
                        value={razon}
                        onSubmitEditing={ onRealizarReclamo }
                        autoCapitalize="none"
                        autoCorrect={ false }
                    />
                    <Text style={ reclamoStyles.label }>Comentario</Text>
                    <Input 
                        placeholder="Comentario"
                        placeholderTextColor="rgba(255,80,40,0.3)"
                        inputContainerStyle={reclamoStyles.inputField}
                        leftIcon={<Ionicons size={24} color={"#FD801E"} 
                        type={'font-awesome'} name="person"/>}
                        keyboardType="default"
                        selectionColor="black"
                        onChangeText = {setComentario}
                        value={comentario}
                        onSubmitEditing={ onRealizarReclamo }
                        autoCapitalize="none"
                        autoCorrect={ false }
                    />
                </View>
                <View style={ reclamoStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        style={ reclamoStyles.button }
                        onPress={ onRealizarReclamo }
                        >
                        <Text style={ reclamoStyles.buttonText } >Reclamar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}