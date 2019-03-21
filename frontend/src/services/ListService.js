import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });

const LIST_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/list'
    : '//localhost:3000/api/list';

const resolveData = res => res.data

export default {
    query,
    saveList,
    getListById,
    getEmptyList,
    removeList,
    updateLists
}

function getListById(listId) {
    return axios.get(`${LIST_URL}/${listId}`).then(resolveData)
}

function query({ boardId, archived = false }) {
    return axios.get(LIST_URL, { boardId, archived }).then(resolveData);
}

function updateLists(lists) {
    return Promise.all([
        lists.map(list => this.saveList(list))
    ]).then(lists => Promise.resolve(lists))
}

function saveList(list) {
    if (list._id) {
        return axios.put(`${LIST_URL}/${list._id}`, list)
    } else {        
        return axios.post(LIST_URL, list)
    }
}

function removeList(listId) {
    return axios.delete(`${LIST_URL}/${listId}`)
}

function getEmptyList() {
    return {
        title: '',
        boardId: null,
        order: null,
        archived: false
    }
}