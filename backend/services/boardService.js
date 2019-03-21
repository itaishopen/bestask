const mongoService = require('./mongoService')
const BOARDS_DB = 'boards';

const ObjectId = require('mongodb').ObjectId;

function query({ userId }) {
    return mongoService.connect()
        .then(db => {
            return db.collection(BOARDS_DB).find({ userId }).toArray()
        })
}

function addBoard(board) {
    if (board._id) board._id = new ObjectId(board._id);
    return mongoService.connect()
        .then(db => db.collection(BOARDS_DB).insertOne(board).then(res => {
            board._id = res.insertedId
            return board
        }))
}

function getBoardById(boardId) {
    const _id = new ObjectId(boardId)
    return mongoService.connect()
        .then(db => db.collection(BOARDS_DB).findOne({ _id }))
}

function removeBoard(boardId) {
    const _id = new ObjectId(boardId);
    return mongoService.connect()
        .then(db => db.collection(BOARDS_DB).deleteOne({ _id }))
}

function updateBoard(board) {
    board._id = new ObjectId(board._id);
    return mongoService.connect()
        .then(db => db.collection(BOARDS_DB).updateOne({ _id: board._id }, { $set: board }))
}

function getEmptyBoard() {
    return {
        title: '',
        members: [],
        prefs:{}
    }
}


module.exports = {
    query,
    addBoard,
    getBoardById,
    removeBoard,
    updateBoard,
    getEmptyBoard
}