import axios from 'axios';

const authApi = axios.create({
   baseURL: 'https://codefact.udea.edu.co/modulo-21/'
})

export default authApi;