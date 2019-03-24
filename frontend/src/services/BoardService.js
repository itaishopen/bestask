import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });
const BOARD_URL = process.env.NODE_ENV !== 'development'
? '/api/board'
: '//localhost:3000/api/board' ;

const resolveData = res => res.data

export default {
    query,
    saveBoard,
    getBoardById,
    removeBoard
}

function getBoardById(boardId) {
    return axios.get(`${BOARD_URL}/${boardId}`).then(resolveData)
}

function query({userId}) {
    return axios.get(BOARD_URL, userId).then(resolveData);
}

function saveBoard(board) {        
    if (board._id) {
        return axios.put(`${BOARD_URL}/${board._id}`, board).then(resolveData)
    } else {
        return axios.post(BOARD_URL, board).then(resolveData)
    }
}

function removeBoard(boardId) {
    return axios.delete(`${BOARD_URL}/${boardId}`)
}