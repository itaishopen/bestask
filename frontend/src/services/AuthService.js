import axios from 'axios'
const BASE_URL = process.env.NODE_ENV !== 'development'
    ? '/api'
    : '//localhost:3003/api';
const resolveData = res => res.data

function login(userCredentials){
    return axios.put(`${BASE_URL}/login`,userCredentials)
    .then(resolveData)
}

function signup(user){
    return axios.put(`${BASE_URL}/signup`,user)
    .then(resolveData)
}

export default {
    login,
    signup
}