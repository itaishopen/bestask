import CardService from '../services/CardService.js';

const cardStore = {
    state: {
        cards: [],
        currCard: null,
    },
    mutations: {
        setCards(state, payload) {
            state.cards = payload.cards;
        },
        setCard(state, { card }) {
            state.currCard = card;
        },
        removeCard(state, { cardId }) {
            const idx = state.cards.findIndex(card => card._id === cardId);
            state.cards.splice(idx, 1);
        },
        addCard(state, { savedCard }) {
            state.cards.push(savedCard);
        },
        updateCard(state, { savedCard }) {
            const idx = state.cards.findIndex(card => card._id === savedCard._id);
            state.cards.splice(idx, 1, savedCard);
        },
    },
    getters: {
        getCurrCard(state) {
            return state.currCard;
        },
        getCards(state) {
            return state.cards;
        },
        getEditableCurrcard(state) {
            return JSON.parse(JSON.stringify(state.currCard));
        },
    },
    actions: {
        loadCards(context) {
            return CardService.query()
                .then(cards => {
                    context.commit({ type: 'setCards', cards })
                })
        },
        loadCard(context, { cardId }) {
            return CardService.getCardById(cardId)
                .then(card => {                    
                    context.commit({ type: 'setCard', card: card[0] });
                    return card[0]
                })
        },
        removeCard(context, { cardId }) {
            return CardService.removeCard(cardId)
                .then(() => {
                    context.commit({ type: 'removeCard', cardId })
                })
        },
        saveCard(context, { card }) {
            const isEdit = !!card._id
            return CardService.saveCard(card)
                .then(savedCard => {
                    if (isEdit) context.commit({ type: 'updateCard', savedCard: savedCard[0] });
                    else context.commit({ type: 'addCard', savedCard: savedCard[0] });
                })
        },
    }
}

export default cardStore;

