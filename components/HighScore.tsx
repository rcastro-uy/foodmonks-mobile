
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Rating, Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { altaCalificacion } from '../api/actions';

export default function HighScore({toastRef, idPedido, setMostrarModal,setCalificacion, setRefrescar } : any) {
    const [text, setText] = useState('');
    const [calificar, setCalificar] = useState(5);
    const [id, setID] = useState('');
    const [loading, setLoading] = useState(false)

   
   
    const cancelar = () => {
        setMostrarModal(false)
        return;
    }

    const onSubmit = async () => {
        setLoading(true)
        const resp = await altaCalificacion(idPedido,calificar.toString(),text)
        setLoading(false)

        if (!resp){
            return
        }
        setCalificacion(calificar.toString())
        setRefrescar(true)
        toastRef.current.show("Se envió correctamente la calificacion.", 3000)
        setMostrarModal(false)
    }

   
    return (
        <>
        <KeyboardAwareScrollView>
        <View style={{margin:5}}>
            <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center',bottom:10, width:'100%', borderBottomWidth:1}}>¿Como estuvo el servicio? </Text>
            <AirbnbRating
                count={5}
                reviews={["Muy malo", "Malo", "Bueno", "Muy bueno", "Excelente"]}
                defaultRating={calificar}
                onFinishRating= {(number) => setCalificar(number)}
                size={50}
            />
             <TextInput
                mode="outlined"
                label="ingrese su opinion"
                placeholder="escriba su opinion"
                value={text}
                activeOutlineColor="orange"
                multiline = {true}
                numberOfLines= {3}
                maxLength={50}
                onChangeText={text => setText(text)}
                right={<TextInput.Affix text="/50" />} onPressIn={undefined} onPressOut={undefined}   
            />
            <View style={{flexDirection:'row', top:5, justifyContent:'space-evenly'}}>

                    <Button
                        
                        type="outline"
                        buttonStyle = {styles.button}
                        activeOpacity={ 0.8 }
                        style={ styles.button }
                        onPress={cancelar}
                        //loading= {loading}
                        title = 'Cancelar'
                        titleStyle= {styles.title}
                    />

                    <Button
                        
                        type="outline"
                        buttonStyle = {styles.button}
                        activeOpacity={ 0.8 }
                        style={ styles.button }
                        onPress={ onSubmit }
                        loading= {loading}
                        title = 'Enviar'
                        titleStyle= {styles.title}
                    />

            </View>
        </View>
        </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        top:-10,
        marginTop:20,
        paddingLeft:10,
        paddingVertical: 10,
        
    },
    button: {
       width: 125, 
        borderColor:'#FD801E',
        backgroundColor:'#FD801E',
        borderWidth:1,
        borderRadius: 100,
        alignSelf: 'center'
    },
    title: {
        alignItems: 'center',
        color : 'white'

    },
    input: {
        fontSize : 16,
        backgroundColor : 'transparent',
        borderBottomWidth: 1,
        borderBottomColor:"black",
        
    },
})


