const userService = require('../services/userService')
const boardService = require('../services/boardService')
const USER_URL = '/api/user'
function addUserRoutes(app) {
    // Users REST API:

    // // LIST
    // app.get(USER_URL, (req, res) => {
    //     const boardId = req.body        
    //     userService.query(boardId)
    //         .then(users => res.json(users))
    // })

    // SINGLE - GET Full details including boards
    app.get(`${USER_URL}/:userId`, (req, res) => {
        const userId = req.params.userId;        
        Promise.all([
            userService.getUserById({userId}),
            boardService.query({userId})
        ])
        .then(([user,boards]) => {
            res.json({ user,boards })
        })
    })

    // DELETE
    app.delete(`${USER_URL}/:userId`, (req, res) => {
        const userId = req.params.userId;
        userService.removeUser(userId)
            .then(() => res.end(`The User ${userId} Was Deleted `))
    })
    
    // UPDATE
    app.put(`${USER_URL}/:userId`, (req, res) => {
        const user = req.body;
        user.firstName[0].toUpperCase()
        user.lastName[0].toUpperCase()
        userService.updateUser(user)
            .then(user => res.json(user))
    })

    // Check login
    app.put(`/api/login`, (req, res) => {
        const userCredentials = req.body;
        userService.checkLogin({userCredentials})
        .then(user => {
            req.session.user = user
            res.json(user)
        }) .catch(res.catch)
    })

    // CREATE
    app.post(`/api/singup`, (req, res) => {
        const newUser = req.body;
        newUser.firstName[0].toUpperCase()
        newUser.lastName[0].toUpperCase()
        userService.addUser(newUser)
            .then(user => res.json(user))
    })

}


module.exports = addUserRoutes;