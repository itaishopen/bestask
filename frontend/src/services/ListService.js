import HttpService from './HttpService';

const LIST_URL = HttpService.getUrl('list')

// const resolveData = res => res.data

export default {
    query,
    saveList,
    getListById,
    getEmptyList,
    removeList,
    updateLists
}

async function getListById(listId) {
    return await HttpService.get(`${LIST_URL}/${listId}`)
}

async function query({ boardId, archived = false }) {
    return await HttpService.get(LIST_URL, { boardId, archived }).then(savedLists => savedLists)
}

async function updateLists(lists) {
    return await Promise.all([lists.map(list => this.saveList(list))])
}

async function saveList(list) {
    if (list._id) {
        return await HttpService.put(`${LIST_URL}/${list._id}`, list)
            .then(savedList => {                
                if (savedList[0].cards.length === 0) {
                    savedList[0].cards.push({_id: 'fun'})
                }
                return savedList
            })
    } else {
        return await HttpService.post(LIST_URL, list).then(savedList => {
            if (savedList[0].cards.length === 0) {
                savedList[0].cards.push({_id: 'fun'})
            }
            return savedList
        })
    }
}

function removeList(listId) {
    return HttpService.delete(`${LIST_URL}/${listId}`)
}

function getEmptyList() {
    return {
        title: '',
        boardId: null,
        order: null,
        archived: false
    }
}