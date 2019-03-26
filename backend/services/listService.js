const mongoService = require('./mongoService')
const LIST_DB = 'lists';

const ObjectId = require('mongodb').ObjectId;

function query({ boardId = null }) {
    boardId = new ObjectId(boardId)
    return mongoService.connect().then(db => {
        return db.collection(LIST_DB)
            .aggregate([
                {
                    $match: { boardId }
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
                        let: { list_id: "$_id" },
                        pipeline: [
                            {
                                $match:
                                {
                                    '$expr':
                                        { '$eq': ["$listId", "$$list_id"] },
                                },
                            },
                            {
                                $unwind: {
                                    path: "$members",
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $lookup:
                                {
                                    from: "users",
                                    let: { user_Id: "$members.userId" },
                                    pipeline: [
                                        {
                                            $match:
                                            {
                                                $expr:
                                                    { '$eq': ["$_id", "$$user_Id"] },
                                            },
                                        }
                                    ],
                                    as: 'resultingArray'
                                }
                            },
                            {
                                $group: {
                                    "_id": "$_id",
                                    "title": { "$first": "$title" },
                                    "description": { "$first": "$description" },
                                    "listId": { "$first": "$listId" },
                                    "dueDate": { "$first": "$dueDate" },
                                    "labels": { "$first": "$labels" },
                                    "attachments": { "$first": "$attachments" },
                                    "checklists": { "$first": "$checklists" },
                                    "order": { "$first": "$order" },
                                    "archived": { "$first": "$archived" },
                                    "et": { "$first": "$et" },
                                    "at": { "$first": "$at" },
                                    "members": { "$push": "$members" },
                                    "users": { "$push": "$resultingArray" }
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
        .then(db => {
            return db.collection(LIST_DB).insertOne(list)
        })
        .then(res => {
            return getListById(res.insertedId)
        })
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
                        let: { list_id: "$_id" },
                        pipeline: [
                            { 
                                $match:
                                {
                                    '$expr':
                                        { '$eq': ["$listId", "$$list_id"] },
                                },
                            },
                            // {
                            //     $unwind: {
                            //         path: "$members",
                            //         preserveNullAndEmptyArrays: true
                            //     }
                            // },
                            // {
                            //     $lookup:
                            //     {
                            //         from: "users",
                            //         let: { members: "$members" },
                            //         pipeline: [
                            //             {
                            //                 $match:
                            //                 {
                            //                     $expr:
                            //                         {'$in': ["$_id", "$$members"] },
                            //                 },
                            //             }
                            //         ],
                            //         as: 'users'
                            //     }
                            // },
                            // {
                            //     $group: {
                            //         "_id": "$_id",
                            //         "title": { "$first": "$title" },
                            //         "description": { "$first": "$description" },
                            //         "listId": { "$first": "$listId" },
                            //         "dueDate": { "$first": "$dueDate" },
                            //         "labels": { "$first": "$labels" },
                            //         "attachments": { "$first": "$attachments" },
                            //         "checklists": { "$first": "$checklists" },
                            //         "order": { "$first": "$order" },
                            //         "archived": { "$first": "$archived" },
                            //         "et": { "$first": "$et" },
                            //         "at": { "$first": "$at" },
                            //         "members": { "$push": "$members" },
                            //         "users": { "$first": "$users" }
                            //     }
                            // },
                            { $sort: { 'order': 1 } }

                        ],
                        as: 'cards'
                    }
                },
                { $sort: { order: 1 } }
            ]).toArray())
}

function removeList(listId) {
    const _id = new ObjectId(listId);
    return mongoService.connect()
        .then(db => db.collection(LIST_DB).remove({ _id }))
}

function updateList(list) {
    let listId = list._id
    list._id = new ObjectId(list._id);
    list.boardId = new ObjectId(list.boardId);
    return mongoService.connect()
        .then(db => {
            return db.collection(LIST_DB)
                .updateOne({ _id: list._id }, { $set: list })
        })
        .then(() => {
            return getListById(listId)
        })
}


module.exports = {
    query,
    addList,
    getListById,
    removeList,
    updateList,
}