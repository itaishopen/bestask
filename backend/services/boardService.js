const mongoService = require('./mongoService')
const BOARDS_DB = 'boards';

const ObjectId = require('mongodb').ObjectId;

function query({userId = 'guest'}) {
    if (userId !== 'guest') userId = new ObjectId(userId)
    return mongoService.connect()
        .then(db => {
            return db.collection(BOARDS_DB)
                .aggregate([
                    {
                        $match: {
                            $expr:
                                { $in: [userId, "$members"] },
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

function addBoard(board) {
    if (board._id) board._id = new ObjectId(board._id);
    delete board.users
    board.members = board.members.map(user => {
        if (user !== 'guest') return new ObjectId(user);
    })
    return mongoService.connect()
        .then(db => {
            return db.collection(BOARDS_DB).insertOne(board)
        })
        .then(res => {
            return getBoardById(res.insertedId)
        })
}

function getBoardById(boardId) {
    const _id = new ObjectId(boardId)
    return mongoService.connect()
        .then(db => {
            return db.collection(BOARDS_DB)
                .aggregate([
                    {
                        $match: { _id }
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

function removeBoard(boardId) {
    const _id = new ObjectId(boardId);
    return mongoService.connect()
        .then(db => db.collection(BOARDS_DB).deleteOne({ _id }))
}

function updateBoard(board) {
    let boardId = board._id
    board._id = new ObjectId(board._id);
    delete board.users
    board.members = board.members.map(user => {
        if (user !== 'guest') return new ObjectId(user);
    })
    return mongoService.connect()
        .then(db => {
            return db.collection(BOARDS_DB).updateOne({ _id: board._id }, { $set: board })
        })
        .then(() => {
            return getBoardById(boardId)
        })
}

function getEmptyBoard() {
    return {
        title: '',
        members: [],
        prefs: {
            bgPic: { src: "", boardNavOp: 0.7 },
            bgColor: { color: "#4286f4", boardNavOp: 0.5 }
        }
    }
}


module.exports = {
    query,
    addBoard,
    getBoardById,
    removeBoard,
    updateBoard,
    getEmptyBoard
}