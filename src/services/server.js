import axios from 'axios'
const url = 'localhost:3000/'
const token = await localStorage.getItem('token')

const apiService = axios.create({
    baseURL: url,
});

if (token != '') { apiService.defaults.headers.common['Authorization'] = token }

export default apiService;