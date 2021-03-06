const boardService = require('../services/boardService')
const listService = require('../services/listService')
const cardService = require('../services/cardService')
const activityService = require('../services/activityService')
const BOARD_URL = '/api/board'


function addBoardRoutes(app) {
    // BoardS REST API:

    // LIST
    app.get(BOARD_URL, (req, res) => {
        const userId = req.body        
        boardService.query(userId)
            .then(boards => res.json(boards))
    })

    // SINGLE - GET Full details including lists and users
    app.get(`${BOARD_URL}/:boardId`, (req, res) => {
        const boardId = req.params.boardId;        
        Promise.all([
            boardService.getBoardById(boardId),
            listService.query({ boardId }),
            activityService.query({ boardId }),
        ])
            .then(([board, lists, activities]) =>  {
                res.json({board, lists, activities})})
    })

    // DELETE
    app.delete(`${BOARD_URL}/:boardId`, (req, res) => {
        const boardId = req.params.boardId;
        listService.query({ boardId }).then(lists => {
            boardService.removeBoard(boardId)
                .then(() => {
                    Promise.all(lists.map(list => Promise.all([
                        listService.removeList(list._id),
                        cardService.removeCards(list._id)
                    ]).then(() => Promise.resolve())))
                        .then(() => {
                            res.end(`The Board ${boardId} Was Deleted `)
                        })
                })
        })
    })

    // CREATE
    app.post(BOARD_URL, (req, res) => {
        const board = req.body;
        boardService.addBoard(board)
            .then(board => {
                res.json(board)
            })
    })

    // UPDATE
    app.put(`${BOARD_URL}/:boardId`, (req, res) => {
        const board = req.body;        
        boardService.updateBoard(board)
            .then(board => res.json(board))
    })

}


module.exports = addBoardRoutes;