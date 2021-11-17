import { Dimensions, Platform, StyleSheet } from "react-native";

const { width: windowWidth } = Dimensions.get('window');
export const recoverpassStyles = StyleSheet.create ({
    formContainer: {
        flex: 1,
        paddingHorizontal: 11,
        justifyContent:'center',
        
    },
    title: {
        color: '#FD801E',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -10
    },
    label: {
        marginTop: 25,
        color: '#FD801E',
        fontWeight: 'bold',
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor:"black"
    },
    btnVisibility: {
        height: 40,
        width: 35,
        paddingTop: 8,
        paddingLeft:5,
        paddingRight:5
    },
    btnImage:{
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        borderWidth: 2,
        borderColor: '#FD801E',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100
    },
    buttonText: {
        fontSize: 18,
        color: '#FD801E'
    },
    buttonTextRegistrar: {
        fontSize: 18,
        color: 'white'
    },
    rememberPassContainer: {
        alignItems: 'flex-end',
        marginTop: -10
    }
})