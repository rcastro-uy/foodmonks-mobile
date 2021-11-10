import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { Buffer } from "buffer"
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import foodMonksApi from "../api/foodMonksApi";
import { LoginData, LoginResponse, NuevoCliente, UserInfoResponse } from "../interfaces/AppInterfaces";
import { authReducer, AuthState } from "./AuthReducer";


interface AuthContextProps {
    MensajeOk: string
    MensajeError: string;
    token: string | null;
    usuario: UserInfoResponse | null;
    estado: 'chequear' | 'autenticado' | 'no-autenticado';
    primerCarga: boolean;
    registrarCuenta: (NuevoCliente : NuevoCliente ) => void;
    iniciarSesion: ( loginData : LoginData ) => void;
    cerrarSesion: () => void;
    quitarError: () => void;
    quitarMensajeOk: () => void
    cambiarPrimerCarga: () => void;
    comprobarToken: () => void;
}

const authInicialState: AuthState = {
    MensajeOk: '',
    MensajeError: '',
    token: null,
    usuario: null,
    estado: 'chequear',
    primerCarga : true
}


export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) =>{

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);
    const [notification, setNotification] = useState<any>();
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
             
             const newAuth = resp.config.headers!.Authorization.substring(7);
             const newRefreshAuth = resp.config.headers!.RefreshAuthentication.substring(7);
                if(newAuth !== token || newRefreshAuth !== refreshToken) {
                  localStorage.setItem("token", newAuth);
                  localStorage.setItem("refreshToken", newRefreshAuth);
                }
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

    const getTokenMobile = async () => {
        const {status} = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        const token = await Notifications.getExpoPushTokenAsync();
        console.log({token})

       
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
    const iniciarSesion = async( {correo, contraseña} : LoginData) => {

        getTokenMobile()

        try {
            let password = Buffer.from(contraseña, "utf8").toString('base64');
            let email = Buffer.from(correo, "utf8").toString('base64');
            const resp1 = await foodMonksApi.post<LoginResponse>('/v1/auth/login', { email, password } );
            if (resp1.data.token != null){
                try {
                    const resp = await foodMonksApi.get<UserInfoResponse>('/v1/auth/userinfo', {
                        headers: {
                            Authorization: "Bearer " + resp1.data.token,
                            RefreshAuthentication: "Bearer " + resp1.data.refreshToken,
                          }
                    });
                   
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
                    dispatch({ 
                        type: 'error', 
                        payload: "Algo Salio mal! Vuelva a intentar" || 'Información incorrecta'
                    });
                }
            }
           
            
        } catch (error : any) {
            dispatch({ 
                type: 'error', 
                payload: "Algo Salio mal! Usuario o contraseña incorrecto" || 'Información incorrecta'
            });
            //console.log(error.response.data.message);
            
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
            iniciarSesion,
            cerrarSesion,
            quitarError,
            quitarMensajeOk,
            cambiarPrimerCarga,
            comprobarToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}