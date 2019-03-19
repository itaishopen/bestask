const mongoService = require('./mongo-service')
const usersDb = 'users';

const ObjectId = require('mongodb').ObjectId;

function query(boardId = null) {
    return mongoService.connect()
        .then(db => db.collection(usersDb).filter({ boardId }).toArray())
}

function addUser(user) {
    return mongoService.connect()
        .then(db => db.collection(usersDb).insertOne(user).then(res => {
            return getUserById(res.insertedId).then(user => user)
        }))
}

function getUserById(userId) {
    const _id = new ObjectId(userId)
    return mongoService.connect()
        .then(db => db.collection(usersDb).findOne({ _id }))
}

function removeUser(userId) {
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection(usersDb).remove({ _id }))
}

function updateUser(user) {
    user._id = new ObjectId(user._id);
    return mongoService.connect()
        .then(db => db.collection(usersDb).updateOne({ _id: user._id }, { $set: user }))
}

function checkLogin(userCredentials) {    
    return mongoService.connect()
        .then(db => db.collection(usersDb).findOne(userCredentials))
}


module.exports = {
    query,
    addUser,
    getUserById,
    removeUser,
    updateUser,
    checkLogin
}