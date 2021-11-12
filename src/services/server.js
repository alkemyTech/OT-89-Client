import axios from 'axios'
import getToken from '../helpers/useGetToken';

const token = getToken()

const apiService = axios.create({
    baseURL: 'http://localhost:3000/',
});

if (token !== '') { apiService.defaults.headers.common['Authorization'] = token }

export default apiService;