import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });
const BASE_URL = process.env.NODE_ENV !== 'development'
    ? '/api'
    : '//localhost:3000/api';
const USER_URL = process.env.NODE_ENV !== 'development'
    ? '/api/user'
    : '//localhost:3000/api/user';
const resolveData = res => res.data

function login(userCredentials){    
    return axios.put(`${BASE_URL}/login`, userCredentials)
        .then(resolveData)
}

function signup(user){
    return axios.put(`${BASE_URL}/signup`,user)
        .then(resolveData)
}

function getEmptyUser() {
    return {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email: '',
        prefs: {userPic: null, bgColor: '#ffffff', color: '#000000'}
    }
}

export default {
    login,
    signup,
    getEmptyUser
}