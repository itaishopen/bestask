const mongoService = require('./mongoService')
const CARDS_DB = 'cards';

const ObjectId = require('mongodb').ObjectId;

function query({ listId = null }) {
    if (listId) listId = new ObjectId(listId)
    return mongoService.connect()
        .then(db => {
            return db.collection(CARDS_DB)
                .aggregate([
                    {
                        $match: { listId }
                    },
                    {
                        $lookup:
                        {
                            from: 'lists',
                            localField: 'listId',
                            foreignField: '_id',
                            as: 'list'
                        }
                    },
                    {
                        $lookup:
                        {
                            from: "users",
                            let: { members: "$members" },
                            pipeline: [
                                {
                                    $match:
                                    {
                                        $expr:
                                            { '$in': ["$_id", "$$members"] },
                                    },
                                }
                            ],
                            as: 'users'
                        }
                    },
                ]).toArray()
        })
}

function addCard(card) {
    card.listId = new ObjectId(card.listId)
    card.members = card.members.map(user => {
        if (user !== 'guest') return new ObjectId(user);
    })
    return mongoService.connect()
        .then(db => {
            return db.collection(CARDS_DB).insertOne(card)
        })
        .then(res => {
            return getCardById(res.insertedId)
        })
}

function getCardById(cardId) {
    const _id = new ObjectId(cardId)
    return mongoService.connect()
        .then(db => db.collection(CARDS_DB)
            .aggregate([
                {
                    $match: { _id }
                },
                {
                    $lookup:
                    {
                        from: 'lists',
                        localField: 'listId',
                        foreignField: '_id',
                        as: 'list'
                    }
                },
                {
                    $lookup:
                    {
                        from: "users",
                        let: { members: "$members" },
                        pipeline: [
                            {
                                $match:
                                {
                                    $expr:
                                        { '$in': ["$_id", "$$members"] },
                                },
                            }
                        ],
                        as: 'users'
                    }
                },
            ]).toArray())
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
    const cardId = card._id
    card._id = new ObjectId(card._id);
    card.listId = new ObjectId(card.listId)
    card.members = card.members.map(user => {
        if (user !== 'guest') return new ObjectId(user);
    })
    return mongoService.connect()
        .then(db => {
            return db.collection(CARDS_DB)
                .updateOne({ _id: card._id }, { $set: card })
        })
        .then(() => {
            return getCardById(cardId)
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