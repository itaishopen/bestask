const mongoService = require('./mongoService')
const CARDS_DB = 'cards';

const ObjectId = require('mongodb').ObjectId;

function query({ listId = null }) {
    if (listId) listId = new ObjectId(listId)
    return mongoService.connect()
        .then(db => {
            return db.collection(CARDS_DB).find({listId}).toArray()
        })
}

function addCard(card) {
    card.listId = new ObjectId(card.listId)
    return mongoService.connect()
        .then(db => {
            return db.collection(CARDS_DB)
                .insertOne(card)
                .then(res => {
                    card._id = res.insertedId
                    return card
                })
        })
}

function getCardById(cardId) {
    const _id = new ObjectId(cardId)
    return mongoService.connect()
        .then(db => db.collection(CARDS_DB).findOne({ _id }))
}

function removeCards({ listId }) {
    return this.query({ listId })
        .then(cards => {
            Promise.all(
                cards.map(card => this.removeCard(card._id))
            ).then(() => res.end())
        })
}

function removeCard(cardId) {
    const _id = new ObjectId(cardId);
    return mongoService.connect()
        .then(db => db.collection(CARDS_DB).removeOne({ _id }))
}

function updateCard(card) {
    card._id = new ObjectId(card._id);
    card.listId = new ObjectId(card.listId)
    return mongoService.connect()
        .then(db => {
            return db.collection(CARDS_DB)
                .updateOne({ _id: card._id }, { $set: card })
                .then(() => {
                    return card
                })
        })
}


module.exports = {
    query,
    addCard,
    getCardById,
    removeCard,
    updateCard,
    removeCards,
}