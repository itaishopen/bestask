import axios from 'axios';
 
const LIST_URL = process.env.NODE_ENV !== 'development'
? '/api/list'
: '//localhost:3000/api/list' ;

const resolveData = res => res.data

export default {
    query,
    saveList,
    // getEmpty,
    getListById,
    removeList,
    updateLists
}

function getListById(listId) {
    return axios.get(`${LIST_URL}/${listId}`).then(resolveData)
}

function query({userId}) {
    return axios.get(LIST_URL, userId).then(resolveData);
}

function updateLists(lists) {
    return Promise.all([
        lists.map(list => axios.put(`${LIST_URL}/${list._id}`, list))
    ]).then(lists => Promise.resolve(lists))
}

function saveList(list) {
    if (Array.isArray(list)) {
        Promise.all([
            list.map(singelList => axios.put(`${LIST_URL}/${singelList._id}`, list))
        ]).then()
    }    
    if (list._id) {
        return axios.put(`${LIST_URL}/${list._id}`, list).then(() => Promise.resolve(list))
    } else {
        return axios.post(LIST_URL, list).then(() => Promise.resolve(list))
    }
}

function removeList(listId) {
    return axios.delete(`${LIST_URL}/${listId}`)
}