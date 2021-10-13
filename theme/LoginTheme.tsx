import { Dimensions, Platform, StyleSheet } from "react-native";

const { width: windowWidth } = Dimensions.get('window');
export const loginStyles = StyleSheet.create ({
    container: {
        marginTop: windowWidth/3.5
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent:'center',
        height: 600,
        marginBottom: 50
    },
    title: {
        color: '#FD801E',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: '#FD801E',
        fontWeight: 'bold',
    },
    inputField: {
        borderBottomColor: '#FD801E',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
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
    newUserContainer: {
        alignItems: 'flex-end',
        marginTop: 10
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