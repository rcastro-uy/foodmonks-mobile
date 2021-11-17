import { UserInfoResponse } from "../interfaces/appInterfaces";


export interface AuthState {
    primerCarga:boolean;
    estado: 'chequear' | 'autenticado' | 'no-autenticado';
    token: string | null;
    refreshToken: string | null;
    MensajeError: string;
    MensajeOk: string
    usuario: UserInfoResponse | null;
}

type AuthAction = 
    | { type: 'iniciarSesion', payload: { token: string, usuario: UserInfoResponse, primerCarga:boolean  }}
    | { type: 'error', payload: string }
    | { type: 'quitarError' }
    | { type: 'noAutenticado' }
    | { type: 'cerrarSesion' }
    | { type: 'cambiarPrimerCarga' }
    | { type: 'quitarMensajeOk' }
    | { type: 'exito', payload: string }


    export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

        switch (action.type) {
            case 'error':
                return {
                    ...state,
                    usuario: null,
                    estado: 'no-autenticado',
                    token: null,
                    MensajeError: action.payload
                }
            
            case 'exito':
               return {
                    ...state,
                    MensajeOk: action.payload
                    }
        
            case 'quitarError':
                return {
                    ...state,
                    MensajeError: ''
                };

                case 'quitarMensajeOk':
                    return {
                        ...state,
                        MensajeOk: ''
                    };
    
            case 'iniciarSesion':
                return {
                    ...state,
                    MensajeError: '',
                    estado: 'autenticado',
                    token: action.payload.token,
                    usuario: action.payload.usuario
                }
    
            case 'cerrarSesion':
            case 'noAutenticado':
                return {
                    ...state,
                    estado: 'no-autenticado',
                    token: null,
                    usuario: null
                }
            
                case 'cambiarPrimerCarga':
                return {
                    ...state,
                    primerCarga: false
                };


    
            default:
                return state;
        }
    
    
    }
    