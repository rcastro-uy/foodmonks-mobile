import React, { createContext, useEffect, useReducer } from "react";
import { Buffer } from "buffer"
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

    useEffect(() =>{

        setTimeout(() => {
            comprobarToken();
           }, 2000)   
        
    }, [])

    const comprobarToken = async () => {
        const token = await AsyncStorage.getItem('token');
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        
        //No hay token
        if (!token) return dispatch({type: 'noAutenticado'})

        //Hay token
        const resp = await foodMonksApi.get<UserInfoResponse>('/v1/auth/userinfo', {
            headers: {
                Authorization: "Bearer " + token,
                RefreshAuthentication: "Bearer " + refreshToken,
              }
        });

        if ( resp.status !== 200 ) {
            return dispatch({ type: 'noAutenticado' });
        }

        if (token !== resp.config.headers!.Authorization || refreshToken !== resp.config.headers!.RefreshAuthentication ){
            await AsyncStorage.setItem('refreshToken', resp.config.headers!.RefreshAuthentication)
            await AsyncStorage.setItem('token', resp.config.headers!.Authorization)
        }
        dispatch({ 
            type: 'iniciarSesion',
            payload: {
                token: token,
                usuario: resp.data,
                primerCarga: false,
            }
        });
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
    const iniciarSesion = async( {email, password} : LoginData) => {

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
            cambiarPrimerCarga
        }}>
            {children}
        </AuthContext.Provider>
    )
}