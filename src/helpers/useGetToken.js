
const getToken = () => {
    const token = localStorage.getItem('token')
    return token ? token : ''
}

export default getToken