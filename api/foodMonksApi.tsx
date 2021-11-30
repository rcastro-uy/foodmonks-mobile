import axios from 'axios'
import { API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';


//const foodMonksApi = axios.create( {baseURL});

const foodMonksApi = axios.create({
    baseURL: `${API_URL}`
  });

  foodMonksApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers!["Authorization"] = "Bearer " + token;
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken) {
                config.headers!["RefreshAuthentication"] = "Bearer " + refreshToken;
      }
        }
        return config;
    }
  );

foodMonksApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalConfig = error.config;
      if (error.response) {
        if (error.response.data.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await renovarTokens();
            const token = rs.headers.authorization;
            const refreshToken = rs.headers.refreshauthentication;
            //agregar el seteo del refreshToken
            await setTokens(token, refreshToken);
            foodMonksApi.defaults.headers.common["Authorization"] = await AsyncStorage.getItem('token') || '';
            foodMonksApi.defaults.headers.common["RefreshAuthentication"] = await AsyncStorage.getItem('refreshToken') || '';
            return foodMonksApi(originalConfig);
          } catch (_error : any) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
  
            return Promise.reject(_error);
          }
        }
  
        if (error.response.data.status === 403 && error.response.data) {
          return Promise.reject(error.response.data);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  const setTokens = async (auth : string, refreshAuth : string) => {
  
    await AsyncStorage.setItem("token", auth);
    await  AsyncStorage.setItem("refreshToken", refreshAuth);
    
  }

  export const renovarTokens = async () => {
    const token = await AsyncStorage.getItem('token');
    const refreshToken = await AsyncStorage.getItem('refreshToken')
    return foodMonksApi.get("/v1/auth/refresh", {
        headers: {
            Authorization: "Bearer " + token,
            RefreshAuthentication: "Bearer " + refreshToken,
          }
    });
  };

export default foodMonksApi;