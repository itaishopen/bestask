const listService = require('../services/listService')
const LIST_URL = '/api/list'
const resolveData = res => res.data
function addListRoutes(app) {
    // Lists REST API:

    // LIST
    app.get(LIST_URL, (req, res) => {
        const boardId = req.body;
        listService.query(boardId)
            .then(resolveData)
            
    })

    // SINGLE - GET Full detail
    app.get(`${LIST_URL}/:listId`, (req, res) => {
        const listId = req.params.listId;
        listService.getListById(listId)
            .then(resolveData)
    })

    // DELETE
    app.delete(`${LIST_URL}/:listId`, (req, res) => {
        const listId = req.params.listId;
        listService.removeList(listId)
            .then(() => res.end(`The list ${listId} Was Deleted `))
    })

    // CREATE
    app.post(LIST_URL, (req, res) => {
        const list = req.body;
        listService.addList(list)
            .then(resolveData)
    })

    // UPDATE
    app.put(`${LIST_URL}/:ListId`, (req, res) => {
        const list = req.body;
        listService.update(list)
            .then(resolveData)
    })

}


module.exports = addListRoutes;