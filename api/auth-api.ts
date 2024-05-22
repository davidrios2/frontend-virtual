import axios from 'axios';

const authApi = axios.create({
   baseURL: 'http://localhost:8090'
})

export default authApi;