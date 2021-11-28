import { Dimensions, Platform, StyleSheet } from "react-native";

const { width: windowWidth } = Dimensions.get('window');
export const registerStyles = StyleSheet.create ({
    headerContainer: {
        marginTop: 20,
        borderBottomWidth:1
    },
    formContainer: {
        top:-10,
        marginTop:20,
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
    inputGooglePlace: {
        fontSize : 16,
        backgroundColor : 'transparent',
        borderBottomWidth: 1,
        borderBottomColor:"black"
    },
    button: {
        borderWidth: 2,
        borderColor: '#FD801E',
        backgroundColor:'transparent',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        alignSelf:'center',
        width: '45%',
        marginBottom:20
    },
    buttonText: {
        fontSize: 18,
        color: '#FD801E',
        alignSelf: 'center'
    },
    buttonReturn: {
        position: 'absolute',
        bottom: -3,
        left: 5,
        
    },
})