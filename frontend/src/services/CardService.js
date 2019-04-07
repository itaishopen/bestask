import HttpService from './HttpService';

const CARD_URL = HttpService.getUrl('card')

const resolveData = res => res.data

export default {
    query,
    getCardById,
    removeCard,
    saveCard,
    getEmptyCard,
    updateCards,
    getEmptyChecklist,
    getEmptyToDo
}

function query() {
    return HttpService.get(CARD_URL).then(resolveData)
}

function getCardById(cardId) {
    return HttpService.get(`${CARD_URL}/${cardId}`).then(resolveData)
}

function removeCard(cardId) {
    return HttpService.delete(`${CARD_URL}/${cardId}`)
}

function updateCards(cards) {
    return Promise.all(cards.map(card => this.saveCard(card))).then(() => cards)
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
        at: null,
        prefs : {
            bgColor : '#ffffff'
        }
    }
}

function getEmptyChecklist() {
    return {
        id: randomId(12),
        title: "",
        toDos: []
    }
}

function getEmptyToDo() {
    return { id: randomId(12), name: "", done: false, editStatus: true }
}

function randomId(length_) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (typeof length_ !== "number") {
        length_ = Math.floor(Math.random() * chars.length_);
    }
    var str = '';
    for (var i = 0; i < length_; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}