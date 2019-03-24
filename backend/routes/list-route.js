const listService = require('../services/listService');
const LIST_URL = '/api/list';
const resolveData = res => res.data;
function addListRoutes(app) {
    // Lists REST API:

    // LIST
    app.get(LIST_URL, (req, res) => {
        const boardId = req.body;
        listService.query(boardId)
            .then(lists => res.json(lists))
            
    })

    // SINGLE - GET Full detail
    app.get(`${LIST_URL}/:listId`, (req, res) => {
        const listId = req.params.listId;
        listService.getListById(listId)
            .then(list => res.json(list))
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
            .then(savedList => res.json(savedList))
    })

    // UPDATE
    app.put(LIST_URL, (req, res) => {
        const list = req.body;
        list.board = null;
        list.cards = null;
        listService.updateList(list)
            .then(savedList => res.json(savedList))
    })

}


module.exports = addListRoutes;