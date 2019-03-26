import HttpService from './HttpService';

const CARD_URL = HttpService.getUrl('card')

const resolveData = res => res.data

export default {
    query,
    getCardById,
    removeCard,
    saveCard,
    getEmptyCard,
    updateCards
}

function query() {
    return HttpService.get(CARD_URL)
}

function getCardById(cardId) {
    return HttpService.get(`${CARD_URL}/${cardId}`)
}

function removeCard(cardId) {
    return HttpService.delete(`${CARD_URL}/${cardId}`)
}

function updateCards(cards) {
    return Promise.all([cards.map(card => this.saveCard(card))])
}

function saveCard(card) {
    if (card._id) {        
        return HttpService.put(`${CARD_URL}/${card._id}`, card)
    } else {
        return HttpService.post(CARD_URL, card)
    }
}

function getEmptyCard() {
    return {
        listId: null,
        title: '',
        description: null,
        members: [],
        labels: [],
        checklists: [],
        dueDate: null,
        attachments: [],
        order: null,
        archived: false,
        et: null,
        at: null
    }
}