import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });
const ACTIVITY_URL = process.env.NODE_ENV !== 'development'
? '/api/activity'
: '//localhost:3000/api/activity' ;

const resolveData = res => res.data

export default {
    query,
    saveActivity,
    getEmptyActivity
}

function query({userId = null, boardId = null}) {
    return axios.get(ACTIVITY_URL, {userId: null, boardId: null}).then(resolveData);
}

function saveActivity(activity) {    
        return axios.post(ACTIVITY_URL, activity).then(resolveData)
}

function getEmptyActivity() {
    return {
        text: '',
        userId: '',
        boardId: 1,
        listId: 1,
        cardId: 1,
        createdAt: null,
    }
}