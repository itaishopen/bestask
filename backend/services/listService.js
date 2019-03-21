const mongoService = require('./mongoService')
const LIST_DB = 'lists';

const ObjectId = require('mongodb').ObjectId;

function query({ boardId = null, archived = false } = {}) {
    const criteria = { archived }
    if (boardId) criteria.boardId = new ObjectId(boardId);
    boardId = new ObjectId(boardId)
    return mongoService.connect().then(db => {
        return db.collection(LIST_DB)
            .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup:
                    {
                        from: 'boards',
                        localField: 'boardId',
                        foreignField: '_id',
                        as: 'board'
                    }
                },
                {
                    $lookup:
                    {
                        from: 'cards',
                        let: { list_id: "$_id", archive: "$archived" },
                        pipeline: [
                            {
                                $match:
                                {
                                    '$expr':
                                    {
                                        '$and': [
                                            { '$eq': ["$listId", "$$list_id"] },
                                            { '$eq': ["$archived", "$$archive"] },
                                        ]
                                    }
                                }
                            },
                            { $sort: { 'order': 1 } }
                        ],
                        as: 'cards'
                    }
                },
                { $sort: { order: 1 } }
            ]).toArray()
    })
}

function addList(list) {
    list.boardId = new ObjectId(list.boardId);
    return mongoService.connect()
        .then(db => db.collection(LIST_DB).insertOne(list).then(res => {
            list._id = res.insertedId
            return list
        }))
}

function getListById(listId) {
    const _id = new ObjectId(listId)
    return mongoService.connect()
        .then(db => db.collection(LIST_DB) 
            .aggregate([
                {
                    $match: { _id }
                },
                {
                    $lookup:
                    {
                        from: 'cards',
                        let: { list_id: "$_id", archive: "$archived" },
                        pipeline: [
                            {
                                $match:
                                {
                                    '$expr':
                                    {
                                        '$and': [
                                            { '$eq': ["$listId", "$$list_id"] },
                                            { '$eq': ["$archived", "$$archive"] },
                                        ]
                                    }
                                }
                            },
                            { $sort: { 'order': 1 } }
                        ],
                        as: 'cards'
                    }
                },
            ]))
}

function removeList(listId) {
    const _id = new ObjectId(listId);
    return mongoService.connect()
        .then(db => db.collection(LIST_DB).remove({ _id }))
}

function updateList(list) {
    list._id = new ObjectId(list._id);
    list.boardId = new ObjectId(list.boardId);
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