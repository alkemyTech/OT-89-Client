import axios from 'axios'

const token = localStorage.getItem('token')

const apiService = axios.create({
    baseURL: 'http://localhost:3000',
});

if (token !== '') { apiService.defaults.headers.common['Authorization'] = token }

export default apiService;