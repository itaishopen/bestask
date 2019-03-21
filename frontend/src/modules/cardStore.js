import CardService from '../services/CardService.js';


const cardStore = {
    state: {
        cardItems: [],
        currCardItem: null,
    },
    mutations: {
        setCardItems(state, payload) {
            state.cardItems = payload.cardItems;
        },
        setCardItem(state, { cardItem }) {
            state.currCardItem = cardItem;
        },
        removeItem(state, { itemId }) {
            const idx = state.cardItems.findIndex(item => item._id === itemId);
            state.cardItems.splice(idx, 1);
        },
        addItem(state, { item }) {
            state.cardItems.push(item);
        },
        updateItem(state, { item }) {
            const idx = state.cardItems.findIndex(currItem => currItem._id === item._id);
            state.cardItems.splice(idx, 1, item);
        },
    },
    getters: {
        currCardItem(state) {
            return state.currCardItem;
        },
        cardItems(state) {
            return state.cardItems;
        },
        cardItemToEdit(state) {
            return JSON.parse(JSON.stringify(state.currCardItem))
        },
        cardItemToAdd(state) {
            return CardService.getEmptyCard();
        },
    },
    actions: {
        loadCardItems(context) {
            return CardService.query()
                .then(cardItems => {
                    context.commit({ type: 'setCardItems', cardItems })
                })
        },
        loadCardItem(context, { itemId }) {
            // console.log(itemId);
            CardService.getCardById(itemId)
                .then(cardItem => {
                    context.commit({ type: 'setCardItem', cardItem })
                })
        },
        removeItem(context, { itemId }) {
            return CardService.removeItem(itemId)
                .then(() => {
                    context.commit({ type: 'removeItem', itemId })
                })
        },
        addItem(context, { item }) {
            console.log(item, 'store');
            return CardService.addItem(item)
                .then((savedItem) => {
                    context.commit({ type: 'addItem', item: savedItem });
                })
        },
        updateItem(context, { item }) {
            // console.log(item);
            return CardService.updateItem(item)
                .then((savedItem) => {
                    context.commit({ type: 'updateItem', item: savedItem });
                })
        }
    }
}

export default cardStore;

