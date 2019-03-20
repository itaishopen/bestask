const mongoService = require('./mongoService')
const LIST_DB = 'lists';

const ObjectId = require('mongodb').ObjectId;

function query({ boardId }) {    
    return mongoService.connect().then(db => {
        return db.collection(LIST_DB).find({ boardId, archived: false}).sort({order: 1}).toArray()
    })
}

function addList(list) {
    return mongoService.connect()
        .then(db => db.collection(LIST_DB).insertOne(list).then(res => {
            list._id = res.insertedId
            return list
        }))
}

function getListById(listId) {
    const _id = new ObjectId(listId)
    return mongoService.connect()
        .then(db => db.collection(LIST_DB).findOne({ _id }))
}

function removeList(listId) {
    const _id = new ObjectId(listId);
    return mongoService.connect()
        .then(db => db.collection(LIST_DB).remove({ _id }))
}

function updateList(list) {
    list._id = new ObjectId(list._id);
    return mongoService.connect()
        .then(db => db.collection(LIST_DB).updateOne({ _id: list._id }, { $set: list }))
}


module.exports = {
    query,
    addList,
    getListById,
    removeList,
    updateList,
}