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
                        from: 'boards',
                        localField: 'boardId',
                        foreignField: '_id',
                        as: 'boards'
                    }
                },
                {
                    $unwind: '$boards'
                },
                {
                    $lookup:
                    {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'users'
                    }
                },
                {
                    $unwind: '$users'
                }
            ]).toArray()
    })
}

function addActivity(activity) {
    activity.userId = new ObjectId(activity.userId);
    activity.boardId = new ObjectId(activity.boardId);
    return mongoService.connect()
        .then(db => db.collection(ACTIVITY_DB).insertOne(activity).then(res => {
            list._id = res.insertedId
            return list
        }))
}

function getUserActivities(userId) {
    userId = new ObjectId(userId)
    return mongoService.connect()
        .then(db =>
            db.collection('review').aggregate([
                {
                    $match: { userId }
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
                    $unwind: '$board'
                }
            ]).toArray()
        )

}

function getListById(listId) {
    const _id = new ObjectId(listId)
    return mongoService.connect()
        .then(db => db.collection(ACTIVITY_DB).findOne({ _id }))
}

function removeList(listId) {
    const _id = new ObjectId(listId);
    return mongoService.connect()
        .then(db => db.collection(ACTIVITY_DB).remove({ _id }))
}

function updateList(list) {
    list._id = new ObjectId(list._id);
    return mongoService.connect()
        .then(db => db.collection(ACTIVITY_DB).updateOne({ _id: list._id }, { $set: list }))
}


module.exports = {
    query,
    addList,
    getListById,
    removeList,
    updateList,
}

const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function getUserReviews(userId) {
    const id = new ObjectId(userId)
    return mongoService.connect()
        .then(db =>
            db.collection('review').aggregate([
                {
                    $match: { userId: id }
                },
                {
                    $lookup:
                    {
                        from: 'car',
                        localField: 'carId',
                        foreignField: '_id',
                        as: 'car'
                    }
                }, {
                    $unwind: '$car'
                }
            ]).toArray()
        )

}


function query({ userId = null, carId = null } = {}) {
    const criteria = {}
    if (userId) criteria.userId = new ObjectId(userId)
    if (carId) criteria.carId = new ObjectId(carId)
    return mongoService.connect().then(db => {
        return db.collection('review')
            .aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup:
                    {
                        from: 'car',
                        localField: 'carId',
                        foreignField: '_id',
                        as: 'car'
                    }
                },
                {
                    $unwind: '$car'
                },
                {
                    $lookup:
                    {
                        from: 'user',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                }
            ]).toArray()
    })
}




module.exports = {
    query,
    getUserReviews,
    addReview
}