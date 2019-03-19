const userService = require('../services/userService')
const reviewService = require('../services/reviewService')


function addUserRoutes(app) {
    // Users REST API:

    // LIST
    app.get('/api/user', (req, res) => {
        userService.query()
            .then(users => res.json(users))
            
    })

    // SINGLE - GET Full details including reviews
    app.get('/api/user/:userId', (req, res) => {
        const userId = req.params.userId;
        Promise.all([
            userService.getUserById(userId),
            reviewService.query({userId})
        ])
        .then(([user,reviews]) => {
            res.json({ user,reviews })
        })
    })

    // DELETE
    app.delete('/api/user/:userId', (req, res) => {
        const userId = req.params.userId;
        userService.removeUser(userId)
            .then(() => res.end(`The User ${userId} Was Deleted `))
    })

    // UPDATE
    app.put('/api/user/:userId', (req, res) => {
        const user = req.body;
        userService.update(user)
            .then(user => res.json(user))
    })

    // CREATE
    app.post('/api/singup', (req, res) => {
        const newUser = req.body;
        userService.addUser(newUser)
            .then(user => res.json(user))
    })

    app.put('/api/login', (req, res) => {
        const userCredentials = req.body;
        userService.checkLogin(userCredentials)
        .then(user => {
            req.session.user = user
            res.json(user)
        }) .catch(res.catch)
    })

}


module.exports = addUserRoutes;