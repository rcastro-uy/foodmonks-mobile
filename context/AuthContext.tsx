import React, { createContext, useEffect, useReducer } from "react";
import { Buffer } from "buffer"
import AsyncStorage from '@react-native-async-storage/async-storage';
import foodMonksApi from "../api/foodMonksApi";
import { LoginData, LoginResponse, UserInfoResponse } from "../interfaces/appInterfaces";
import { authReducer, AuthState } from "./AuthReducer";


interface AuthContextProps {
    MensajeError: string;
    token: string | null;
    usuario: UserInfoResponse | null;
    estado: 'chequear' | 'autenticado' | 'no-autenticado';
    primerCarga: boolean;
    registrarCuenta: (  ) => void;
    iniciarSesion: ( loginData : LoginData ) => void;
    cerrarSesion: () => void;
    quitarError: () => void;
    cambiarPrimerCarga: () => void;
}

const authInicialState: AuthState = {
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
        
        console.log ("token en memoria: " + token)
        //No hay token
        if (!token) return dispatch({type: 'noAutenticado'})

        //Hay token (falta agregar que valide el token que tenemos contra el back)
        const resp = await foodMonksApi.get<UserInfoResponse>('/v1/auth/userinfo', {
            headers: {
                Authorization: "Bearer " + token,
              }
        });

        if ( resp.status !== 200 ) {
            return dispatch({ type: 'noAutenticado' });
        }
        //lo voy a necesitar para guardar el nuevo token en caso que sea necesario
        //await AsyncStorage.setItem('token', resp1.data.token)
        dispatch({ 
            type: 'iniciarSesion',
            payload: {
                token: token,
                usuario: resp.data,
                primerCarga: false,
            }
        });
    }

    const registrarCuenta = () => {}
    const iniciarSesion = async( {email, password} : LoginData) => {
        
        
        try {
            let buff = Buffer.from(password, "utf8");
            let passEncode = buff.toString('base64');
            const resp1 = await foodMonksApi.post<LoginResponse>('/v1/auth/login', { email, passEncode } );
            if (resp1.data.token != null){
                try {
                    const resp = await foodMonksApi.get<UserInfoResponse>('/v1/auth/userinfo', {
                        headers: {
                            Authorization: "Bearer " + resp1.data.token,
                          }
                    });
                    console.log(resp.data)
                    dispatch({ 
                        type: 'iniciarSesion',
                        payload: {
                            token: resp1.data.token,
                            usuario: resp.data,
                            primerCarga: false
                        }
                    });
                 await AsyncStorage.setItem('token', resp1.data.token)
           
                } catch (error: any) {
                    dispatch({ 
                        type: 'error', 
                        payload: "Algo Salio mal! Vuelva a intentar" || 'Información incorrecta'
                    });
                }
            }
            console.log(resp1.data.token);
            
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
        dispatch({ type: 'cerrarSesion' });
    };
    const quitarError = () =>  {
        dispatch({type: 'quitarError'})
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
            cambiarPrimerCarga
        }}>
            {children}
        </AuthContext.Provider>
    )
}