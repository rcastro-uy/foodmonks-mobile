import { Ionicons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useEffect } from "react"
import { View, Text, StyleSheet, Image, Keyboard, LogBox, Dimensions, Alert } from "react-native"
import { Input, Button, Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";

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
    const [loading, setLoading] = React.useState(false);
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
            headerTitleStyle:({color:'white'}),
            headerStyle:({backgroundColor:'#FD801E'})
        })
        
    }, [])

    const onRealizarReclamo = async () => {
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
            setLoading(true)
            const resp= await realizarReclamo(idPedido, razon, comentario)
            if (resp){
                Alert.alert("Reclamo con exito", "Se le ha enviado un mail, para dar seguimiento del reclamo", [
                    
                    { text: "Ok", onPress: () => { navigation.goBack()} }
                  ]);
            }
            setLoading(false)
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
                        leftIcon={<Icon size={24} color={"#FD801E"} 
                        type={'material-community'} name="file"/>}
                        keyboardType="default"
                        selectionColor="black"
                        onChangeText = {setRazon}
                        value={razon}
                        onSubmitEditing={ onRealizarReclamo }
                        autoCapitalize="none"
                        autoCorrect={ false }
                    />
                    <Text style={ reclamoStyles.label }>Comentario</Text>
                    <TextInput
                mode="outlined"
                label="escriba su comentario..."
                placeholder="escriba su comentario"
                value={comentario}
                activeOutlineColor="orange"
                multiline = {true}
                numberOfLines= {3}
                maxLength={100}
                onChangeText={text => setComentario(text)}
                right={<TextInput.Affix text="/100" />} onPressIn={undefined} onPressOut={undefined}   
            />
                </View>
                <View style={ reclamoStyles.buttonContainer }>
                    <Button
                        activeOpacity={ 0.8 }
                        type='outline'
                        buttonStyle={ reclamoStyles.button }
                        onPress={ onRealizarReclamo }
                        loading={loading}
                        title="Reclamar"
                        titleStyle={reclamoStyles.buttonText}
                        />
                        
                </View>
            </KeyboardAwareScrollView>
        </>
    )
}