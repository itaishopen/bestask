const mongoService = require('./mongoService')
const USERS_DB = 'users';

const ObjectId = require('mongodb').ObjectId;

function query({ boardId = null }) {
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).find({ boardId }).toArray())
}

function addUser(user) {
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).insertOne(user).then(res => {
            return getUserById(res.insertedId).then(user => user)
        }))
}

function getUserById(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).findOne({ _id }))
}

function removeUser(userId) {
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).remove({ _id }))
}

function updateUser(user) {
    user._id = new ObjectId(user._id);
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).updateOne({ _id: user._id }, { $set: user }))
}

function checkLogin(userCredentials) {    
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).findOne(userCredentials))
}


module.exports = {
    query,
    addUser,
    getUserById,
    removeUser,
    updateUser,
    checkLogin
}