const boardService = require('../services/boardService')
const listService = require('../services/listService')
const cardService = require('../services/cardService')
const BOARD_URL = '/api/board'


function addBoardRoutes(app) {
    // BoardS REST API:

    // LIST
    app.get(BOARD_URL, (req, res) => {
        const userId = req.data
        boardService.query({ userId })
            .then(boards => res.json(boards))
    })

    // SINGLE - GET Full details including lists and users
    app.get(`${BOARD_URL}/:boardId`, (req, res) => {
        const boardId = req.params.boardId;
        Promise.all([
            boardService.getBoardById(boardId),
            listService.query({ boardId }),
        ])
            .then(([board, lists]) => {
                Promise.all(
                    lists.map(list => cardService.query({listId: list._id}).then(cards => {
                        list.cards = cards
                        return Promise.resolve()
                    })
                )).then(() => res.json({board, lists}))
                
            })
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