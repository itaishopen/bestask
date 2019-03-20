import axios from 'axios'
const BASE_URL = process.env.NODE_ENV !== 'development'
    ? ''
    : '//localhost:3003'

function login(user){
    return axios.put(`${BASE_URL}/login`,{
        user
    })
    .then(res => res.data)
}

function signup(user){
    return axios.put(`${BASE_URL}/signup`,{
        user
    })
    .then(res => res.data)
}

export default {
    login,
    signup
}