import { Dimensions, Platform, StyleSheet } from "react-native";

const { width: windowWidth } = Dimensions.get('window');
export const registerStyles = StyleSheet.create ({
    headerContainer: {
        marginTop: 20
    },
    formContainer: {
        
        paddingHorizontal: 11,
        justifyContent:'center',
        
    },
    title: {
        color: '#FD801E',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -30,
        textAlign: 'center'
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
    buttonRegistrar: {
        borderWidth: 2,
        borderColor: '#FD801E',
        backgroundColor: '#FD801E',
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
    },
    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderWidth: 1,
        borderColor: 'orange',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    }
})