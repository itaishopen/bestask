const cardService = require('../services/cardService')
const CARD_URL = '/api/card'

function addCardRoutes(app) {
    // cards REST API:

    // LIST
    app.get(CARD_URL, (req, res) => {
        const listId = req.data
        cardService.query({ listId })
            .then(cards => res.json(cards))
            
    })

    // SINGLE - GET Full detail
    app.get(`${CARD_URL}/:cardId`, (req, res) => {
        const cardId = req.params.cardId;
        cardService.getCardById(cardId)
            .then(card => res.json(card))
    })

    // DELETE
    app.delete(`${CARD_URL}/:cardId`, (req, res) => {
        const cardId = req.params.cardId;
        cardService.removeToy(cardId)
            .then(() => res.end(`The Card ${cardId} Was Deleted `))
    })

    // CREATE
    app.post(CARD_URL, (req, res) => {
        const card = req.body;
        cardService.addToy(card)
            .then(card => res.json(card))
    })

    // UPDATE
    app.put(`${CARD_URL}/:cardId`, (req, res) => {
        const card = req.body;
        cardService.update(card)
            .then(card => res.json(card))
    })

}


module.exports = addCardRoutes;