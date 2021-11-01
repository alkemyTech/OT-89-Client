import axios from 'axios'
url = 'localhost:3000/'

export const Post = async (route, body) => {
    const token = await localStorage.getItem('token')
    if (token) {
        const { data } = await axios.post(url + route, body, { withCredentials: true, headers: { 'Authorization': token } })
        return data
    }
}
export const Get = async (route) => {
    const token = await localStorage.getItem('token')
    if (token) {
        const { data } = await axios.get(url + route, { withCredentials: true, headers: { 'Authorization': token } })
        return data
    } else {
        return undefined
    }
}