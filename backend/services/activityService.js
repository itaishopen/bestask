const mongoService = require('./mongoService')
const ACTIVITY_DB = 'activities';

const ObjectId = require('mongodb').ObjectId;

function query({ boardId = null, userId = null } = {}) {
    const criteria = {}
    if (userId) criteria.userId = new ObjectId(userId)
    if (boardId) criteria.boardId = new ObjectId(boardId)
    return mongoService.connect().then(db => {
        return db.collection(ACTIVITY_DB)
            .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
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
                        from: 'lists',
                        localField: 'listId',
                        foreignField: '_id',
                        as: 'list'
                    }
                },
                {
                    $lookup:
                    {
                        from: 'cards',
                        localField: 'cardId',
                        foreignField: '_id',
                        as: 'card'
                    }
                },
            ]).toArray()
    })
}

function addActivity(activity) {
    activity.userId = new ObjectId(activity.userId);
    if (activity.boardId !== 1) activity.boardId = new ObjectId(activity.boardId);
    if (activity.listId !== 1) activity.listId = new ObjectId(activity.listId);
    if (activity.cardId !== 1) activity.cardId = new ObjectId(activity.cardId);
    return mongoService.connect()
        .then(db => db.collection(ACTIVITY_DB).insertOne(activity).then(res => {
            activity._id = res.insertedId
            return activity
        }))
}

module.exports = {
    query,
    addActivity,
}