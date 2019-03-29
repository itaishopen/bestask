import HttpService from './HttpService';

const BASE_URL = (process.env.NODE_ENV !== 'development')
? `/api`
: `//localhost:3000/api`
const USER_URL = HttpService.getUrl('user')

const resolveData = res => res.data

function getUserAndBoard(userId) {
    return HttpService.get(`${USER_URL}/${userId}`).then(resolveData)
}
function login(userCredentials) {
    return HttpService.put(`${BASE_URL}/login`, userCredentials).then(resolveData)
}

function signup(user) {
    return HttpService.post(`${BASE_URL}/signup`, user).then(resolveData)
}

function getEmptyUser() {
    return {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email: '',
        prefs: { userPic: null, bgColor: '#0000007a', color: '#ffffff' }
    }
}

export default {
    login,
    signup,
    getEmptyUser,
    getUserAndBoard
}