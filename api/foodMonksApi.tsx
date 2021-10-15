import axios from 'axios'

const baseURL = 'http://192.168.0.177:8080/api'

const foodMonksApi = axios.create( {baseURL});

export default foodMonksApi;