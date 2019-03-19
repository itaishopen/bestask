const boardService = require('../services/boardService')
const listService = require('../services/listService')
const userService = require('../services/userService')


function addBoardRoutes(app) {
    // BoardS REST API:

    // LIST
    app.get('/api/board', (req, res) => {
        boardService.query(req.query)
            .then(boards => res.json(boards))

    })

    // SINGLE - GET Full details including reviews
    app.get('/api/board/:boardId', (req, res) => {
        const boardId = req.params.boardId;
        Promise.all([
            boardService.getBoardById(boardId),
            listService.query({ boardId }),
            userService.query({ boardId })
        ])
            .then(([board, lists]) => {
                res.json({
                    board, lists, users
                })
            })
    })

    // DELETE
    app.delete('/api/board/:boardId', (req, res) => {
        const boardId = req.params.boardId;
        listService.query({ boardId }).then(lists => {
            boardService.removeBoard(boardId)
                .then(() => {
                    Promise.all(lists.map(list => listService.removeReview(list._id)))
                        .then(() => {
                            res.end(`The Board ${boardId} Was Deleted `)
                        })
                })
        })
    })

    // CREATE
    app.post('/api/board', (req, res) => {
        const board = req.body;
        boardService.addBoard(board)
            .then(board => {
                res.json(board)
            })
    })

    // UPDATE
    app.put('/api/board/:boardId', (req, res) => {
        const board = req.body;        
        boardService.updateBoard(board)
            .then(board => res.json(board))
    })

}


module.exports = addBoardRoutes;