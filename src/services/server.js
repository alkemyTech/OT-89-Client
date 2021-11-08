import axios from 'axios'

const token = localStorage.getItem('token')

const apiService = axios.create({
    baseURL: URL,
});

if (token !== '') { apiService.defaults.headers.common['Authorization'] = token }

export default apiService;