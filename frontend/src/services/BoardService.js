import HttpService from './services/HttpService';

const BOARD_URL = HttpService.getUrl('board')

const resolveData = res => res.data

export default {
    query,
    saveBoard,
    getBoardById,
    removeBoard,
    getEmptyBoard
}

function getBoardById(boardId) {
    return HttpService.get(`${BOARD_URL}/${boardId}`).then(resolveData)
}

function query({userId}) {
    return HttpService.get(BOARD_URL, userId).then(resolveData);
}

function saveBoard(board) {        
    if (board._id) {
        return HttpService.put(`${BOARD_URL}/${board._id}`, board).then(resolveData)
    } else {
        return HttpService.post(BOARD_URL, board).then(resolveData)
    }
}

function removeBoard(boardId) {
    return HttpService.delete(`${BOARD_URL}/${boardId}`)
}

function getEmptyBoard() {
    return {
        title: '',
        prefs : {
            bgPic : {
                src : '', 
                boardNavOp : 0.7
            }, 
            bgColor : {
                color : '#4286f4', 
                boardNavOp : 0.5
            }
        }, 
        members : [], 
    }
}