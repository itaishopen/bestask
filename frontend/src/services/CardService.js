import Axios from 'axios';
var axios = Axios.create({ withCredentials: true });
const resolveData = res => res.data

export default {
    query,
    getCardById,
    removeCard,
    saveCard,
    getEmptyCard,
    updateCards
}
const CARD_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/card'
    : '//localhost:3000/api/card';

function query() {
    return axios.get(CARD_URL).then(resolveData);
}

function getCardById(cardId) {
    return axios.get(`${CARD_URL}/${cardId}`).then(resolveData);
}

function removeCard(cardId) {
    return axios.delete(`${CARD_URL}/${cardId}`).then(resolveData);
}

function updateCards(cards) {
    return Promise.all([
        cards.map(card => this.saveCard(card))
    ]).then(() => {
        return cards})
}

function saveCard(card) {
    if (card._id) {        
        return axios.put(`${CARD_URL}/${card._id}`, card).then(resolveData)
    } else {
        return axios.post(CARD_URL, card).then(resolveData)
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