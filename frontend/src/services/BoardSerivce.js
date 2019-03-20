import axios from 'axios'


function getBoardById(boardId){
    axios.get(`/api/board/${boardId}`)
    .then(res => res.data)
}

export default {
    getBoardById
}