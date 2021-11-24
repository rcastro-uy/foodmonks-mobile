
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Rating, Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { altaCalificacion, eliminarCalificacion, modificarCalificacion } from '../services/actions';

export default function UpdateDeleteScore({toastRef, idPedido, setMostrarModal,setCalificacion, setRefrescar, calificacion } : any) {
    const [text, setText] = useState('');
    const [calificar, setCalificar] = useState(calificacion);
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

   
   
    const onDelete = async () => {
        setDeleteLoading(true)
        const resp = await eliminarCalificacion(idPedido)
        setDeleteLoading(false)

        if (!resp){
            return
        }
        setCalificacion('false')
        setRefrescar(true)
        toastRef.current.show("Se eliminó correctamente la calificacion.", 3000)
        setMostrarModal(false)
    }

    const onUpdate = async () => {
        setLoading(true)
        const resp = await modificarCalificacion(idPedido,calificar.toString(),text)
        setLoading(false)

        if (!resp){
            return
        }
        setCalificacion(calificar.toString())
        setRefrescar(true)
        toastRef.current.show("Se actualizó correctamente la calificacion.", 3000)
        setMostrarModal(false)
    }

   
    return (
        <>
        <KeyboardAwareScrollView>
        <View style={{margin:5}}>
            <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center',bottom:10, width:'100%', borderBottomWidth:1}}>Calificación</Text>
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
                        onPress={onUpdate}
                        loading= {loading}
                        title = 'Actualizar'
                        titleStyle= {styles.title}
                    />

                    <Button
                        
                        type="outline"
                        buttonStyle = {styles.button}
                        activeOpacity={ 0.8 }
                        style={ styles.button }
                        onPress={ onDelete }
                        loading= {deleteLoading}
                        title = 'Eliminar'
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


