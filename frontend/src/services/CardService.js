import HttpService from './HttpService';

const CARD_URL = HttpService.getUrl('card')

export default {
    query,
    getCardById,
    removeCard,
    saveCard,
    getEmptyCard,
    updateCards
}

function query() {
    return HttpService.get(CARD_URL).then(resolveData);
}

function getCardById(cardId) {
    return HttpService.get(`${CARD_URL}/${cardId}`).then(resolveData);
}

function removeCard(cardId) {
    return HttpService.delete(`${CARD_URL}/${cardId}`).then(resolveData);
}

function updateCards(cards) {
    return Promise.all([cards.map(card => this.saveCard(card))])
}

function saveCard(card) {
    if (card._id) {        
        return HttpService.put(`${CARD_URL}/${card._id}`, card).then(resolveData)
    } else {
        return HttpService.post(CARD_URL, card).then(resolveData)
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