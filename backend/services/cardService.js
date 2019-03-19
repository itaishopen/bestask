const mongoService = require('./mongoService')
const CARDS_DB = 'cards';

const ObjectId = require('mongodb').ObjectId;

function query({ listId = null }) {    
    return mongoService.connect().then(db => {
        return db.collection(CARDS_DB).find({ listId }).toArray()
    })
}

function addCard(card) {
    return mongoService.connect()
        .then(db => db.collection(CARDS_DB).insertOne(card).then(res => {
            card._id = res.insertedId
            return card
        }))
}

function getCardById(cardId) {
    const _id = new ObjectId(cardId)
    return mongoService.connect()
        .then(db => db.collection(CARDS_DB).findOne({ _id }))
}

function removeCard(cardId) {
    const _id = new ObjectId(cardId);
    return mongoService.connect()
        .then(db => db.collection(CARDS_DB).remove({ _id }))
}

function updateCard(card) {
    card._id = new ObjectId(card._id);
    return mongoService.connect()
        .then(db => db.collection(CARDS_DB).updateOne({ _id: card._id }, { $set: card }))
}


module.exports = {
    query,
    addCard,
    getCardById,
    removeCard,
    updateCard,
    getUserCards,
}