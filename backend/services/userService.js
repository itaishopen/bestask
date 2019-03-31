const mongoService = require('./mongoService')
const USERS_DB = 'users';
const ObjectId = require('mongodb').ObjectId;

function query({ boardId = null }) {
    if (boardId) boardId = new ObjectId(boardId)
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).find({}))
}

function addUser(user) {
    user.firstName[0].toUpperCase();
    user.lastName[0].toUpperCase();
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).insertOne(user).then(res => {
            user._id = res.insertedId
            return user
        }))
}

function getUserById({ userId = 'guest' }) {
    if (userId !== 'guest') {
        const _id = new ObjectId(userId)
        return mongoService.connect()
            .then(db => db.collection(USERS_DB)
                .aggregate([
                    { $match: { _id } },
                    {
                        "$lookup": {
                            "from": "activities",
                            "let": { "user_id": "$_id" },
                            "pipeline": [
                                { "$match": { "$expr": { "$eq": ["$userId", "$$user_id"] } } },
                                {
                                    "$lookup": {
                                        "from": "boards",
                                        "localField": 'boardId',
                                        "foreignField": '_id',
                                        "as": "board"
                                    }
                                },
                                {
                                    "$lookup": {
                                        "from": "lists",
                                        "localField": 'listId',
                                        "foreignField": '_id',
                                        "as": "list"
                                    }
                                },
                                {
                                    "$lookup": {
                                        "from": "cards",
                                        "localField": 'cardId',
                                        "foreignField": '_id',
                                        "as": "card"
                                    }
                                },
                            ],
                            "as": "activities"
                        }
                    },
                ]).toArray())
    } else {
        return [{
            firstName: null,
            lastName: null,
            userName: 'guest'+ makeId(3),
            password: null,
            email: null,
            prefs: { userPic: null, bgColor: '#0000007a', color: '#ffffff' }
        }]
    }

}

function removeUser(userId) {
    const _id = new ObjectId(userId);
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).remove({ _id }))
}

function updateUser(user) {
    user._id = new ObjectId(user._id);
    user.activities = null;
    user.firstName[0].toUpperCase();
    user.lastName[0].toUpperCase();
    return mongoService.connect()
        .then(db => db.collection(USERS_DB).updateOne({ _id: user._id }, { $set: user }))
}

function checkLogin({ userCredentials }) {
    return mongoService.connect()
        .then(db => db.collection(USERS_DB)
            .aggregate([
                {
                    $match: {
                        $and: [
                            { userName: userCredentials.userName },
                            { password: userCredentials.password }
                        ]
                    }
                },
                {
                    "$lookup": {
                        "from": "activities",
                        "let": { "user_id": "$_id" },
                        "pipeline": [
                            { "$match": { "$expr": { "$eq": ["$userId", "$$user_id"] } } },
                            {
                                "$lookup": {
                                    "from": "boards",
                                    "let": { "board_Id": "$boardId" },
                                    "pipeline": [
                                        { "$match": { "$expr": { "$eq": ["$_id", "$$board_Id"] } } }
                                    ],
                                    "as": "board"
                                }
                            },
                            {
                                "$lookup": {
                                    "from": "lists",
                                    "let": { "list_Id": "$listId" },
                                    "pipeline": [
                                        { "$match": { "$expr": { "$eq": ["$_id", "$$list_Id"] } } }
                                    ],
                                    "as": "list"
                                }
                            },
                            {
                                "$lookup": {
                                    "from": "cards",
                                    "let": { "card_Id": "$cardId" },
                                    "pipeline": [
                                        { "$match": { "$expr": { "$eq": ["$_id", "$$card_Id"] } } }
                                    ],
                                    "as": "card"
                                }
                            }
                        ],
                        "as": "activities"
                    }
                },
            ]).toArray())

}

function makeId(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = {
    query,
    addUser,
    getUserById,
    removeUser,
    updateUser,
    checkLogin
}