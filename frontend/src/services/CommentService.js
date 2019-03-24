import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });
const ACTIVITY_URL = process.env.NODE_ENV !== 'development'
? '/api/activity'
: '//localhost:3000/api/activity' ;

const resolveData = res => res.data

export default {
    query,
    saveComment,
    getEmptyComment
}

function query({userId = null, boardId = null}) {
    return axios.get(ACTIVITY_URL, {userId = null, boardId = null}).then(resolveData);
}

function saveComment(activity) {    
        return axios.post(ACTIVITY_URL, activity).then(resolveData)
}

function getEmptyComment() {
    return {
        text: '',
        userId: '',
        cardId: '',
    }
}