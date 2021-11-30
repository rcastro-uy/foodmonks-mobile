import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { Buffer } from "buffer"
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import foodMonksApi from "../api/foodMonksApi";
import { LoginData, LoginResponse, NuevoCliente, UserInfoResponse } from "../interfaces/AppInterfaces";
import { authReducer, AuthState } from "./AuthReducer";
import { Alert } from "react-native";


interface AuthContextProps {
    MensajeOk: string
    MensajeError: string;
    token: string | null;
    refreshToken: string | null;
    usuario: UserInfoResponse | null;
    estado: 'chequear' | 'autenticado' | 'no-autenticado';
    primerCarga: boolean;
    registrarCuenta: (NuevoCliente : NuevoCliente ) => void;
    eliminarCuenta: () => void;
    iniciarSesion: ( loginData : LoginData ) => void;
    cerrarSesion: () => void;
    recuperarContrasenia:(email: string) => void,
    quitarError: () => void;
    quitarMensajeOk: () => void
    cambiarPrimerCarga: () => void;
    comprobarToken: () => void;
    getTokenMobile: () => void;

}

const authInicialState: AuthState = {
    MensajeOk: '',
    MensajeError: '',
    token: null,
    refreshToken: null,
    usuario: null,
    estado: 'chequear',
    primerCarga : true
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) =>{

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);
    const [notification, setNotification] = useState<any>();
    const [tokenNotificacion, setTokenNotification] = useState<string>('');
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();


    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

    useEffect(() =>{
        // Este oyente se activa cada vez que se recibe una notificación mientras la aplicación está en primer plano
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
          });
      // Este oyente se activa cada vez que un usuario toca una notificación o interactúa con ella (funciona cuando la aplicación está en primer plano, en segundo plano o eliminada)
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
          });
          
        setTimeout(() => {
            comprobarToken();
           }, 2000)   

           return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
          };
        
    }, [])

    const comprobarToken = async () => {
        const token = await AsyncStorage.getItem('token');
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        
        //No hay token
        if (!token) return dispatch({type: 'noAutenticado'})

        //Hay token
        try{
             const resp = await foodMonksApi.get<UserInfoResponse>('/v1/auth/userinfo', {
                headers: {
                    Authorization: "Bearer " + token,
                    RefreshAuthentication: "Bearer " + refreshToken,
                }
             });
                dispatch({ 
                    type: 'iniciarSesion',
                    payload: {
                        token: token,
                        usuario: resp.data,
                        primerCarga: false,
                    }
                });
            
        }catch (error: any){
        
            return dispatch({ type: 'noAutenticado' });
        }

    }

    const getTokenMobile = async() => {
        const {status} = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        const token = await Notifications.getExpoPushTokenAsync();
        setTokenNotification (token.data)
    }

    const registrarCuenta = async ({nombre, apellido,correo,password,direccion} : NuevoCliente) => {
            
         try{
            
            const resp1 = await foodMonksApi.post('/v1/cliente/altaCliente', { nombre,apellido,correo,password,direccion } );
            dispatch({ 
                type: 'exito', 
                payload: 'Su cuenta se creó correctamente'
            });
        } catch (error: any) {
            dispatch({ 
                type: 'error', 
                payload: error.response.data || 'El correo ya esta registrado'
            });
        }
    }
    const eliminarCuenta = async () => {
        try{
            const resp = await foodMonksApi.delete('/v1/cliente/eliminarCuenta')
            .then((res) => {
                if(res.status == 200) {
                    dispatch({ 
                        type: 'exito', 
                        payload: 'Su cuenta se elimino correctamente'
                    });
                }
            }).catch((err) => {
                dispatch({ 
                    type: 'error', 
                    payload: err || 'La cuenta ya fue eliminada'
                });
            });
        } catch (error: any) {
            dispatch({ 
                type: 'error', 
                payload: error || 'La cuenta ya fue eliminada'
            });
        }
    }
    const iniciarSesion = async( {correo, contraseña} : LoginData) => {
       console.log(tokenNotificacion)
        try {
            let password = Buffer.from(contraseña, "utf8").toString('base64');
            let email = Buffer.from(correo, "utf8").toString('base64');
            let mobileToken = Buffer.from(tokenNotificacion, "utf8").toString('base64')
            const resp1 = await foodMonksApi.post<LoginResponse>('/v1/auth/login', { email, password, mobileToken },{ timeout:4000, headers: {
                'User-Agent' : 'mobile'
              }} );
            if (resp1.data.token != null){
                await AsyncStorage.setItem("token", resp1.data.token);
                await  AsyncStorage.setItem("refreshToken", resp1.data.refreshToken);
                try {
                    const resp = await foodMonksApi.get<UserInfoResponse>('/v1/auth/userinfo');
                   
                    dispatch({ 
                        type: 'iniciarSesion',
                        payload: {
                            token: resp1.data.token,
                            usuario: resp.data,
                            primerCarga: false
                        }
                    });
                 await AsyncStorage.setItem('refreshToken', resp1.data.refreshToken)
                 await AsyncStorage.setItem('token', resp1.data.token)
           
                } catch (error: any) {
                    console.log("inicio sesion obtener info" + error)
                    dispatch({ 
                        type: 'error', 
                        payload: "Algo Salio mal! Vuelva a intentar" || 'Información incorrecta'
                    });
                }
            }
           
            
        } catch (error : any) {
            console.log("inicio sesion " + error)
            if (error == "Error: Network Error"){
                dispatch({ 
                    type: 'error', 
                    payload: "No se pudo conectar con el servidor, intente más tarde"
                });
            }
            else if (error.response.status == "408") {
                dispatch({ 
                    type: 'error', 
                    payload: "No se obtuvo respuesta del servidor, intente mas tarde"
                });
            }
            else {
                dispatch({ 
                    type: 'error', 
                    payload: "Algo salió mal! Usuario o contraseña incorrecto" || 'Información incorrecta'
                });
            }
        }
    }

    const recuperarContrasenia = async (correo: string) => {
        let email = Buffer.from(correo, "utf8").toString('base64');
        try{
            const resp = await foodMonksApi.post('/v1/password/recuperacion/solicitud', {email})    
            Alert.alert(
                "Solicitud enviada",
                `Email: ${correo}`,
                [
                    { text: "OK", style: "default" }
                ]
            )
        } catch (error: any) {
            console.log(error)
            dispatch({ 
                type: 'error', 
                payload: 'Solicitud no enviada, intente mas tarde'
            });
        }
    }

    const cerrarSesion = async() => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');
        dispatch({ type: 'cerrarSesion' });
    };
    const quitarError = () =>  {
        dispatch({type: 'quitarError'})
    }

    const quitarMensajeOk = () =>  {
        dispatch({type: 'quitarMensajeOk'})
    }

    const cambiarPrimerCarga = () =>  {
        dispatch({type: 'cambiarPrimerCarga'})
    }

    return(
        <AuthContext.Provider value={{
            ...state,
            registrarCuenta,
            eliminarCuenta,
            iniciarSesion,
            cerrarSesion,
            recuperarContrasenia,
            quitarError,
            quitarMensajeOk,
            cambiarPrimerCarga,
            comprobarToken,
            getTokenMobile
        }}>
            {children}
        </AuthContext.Provider>
    )
}