import BoardService from '../services/BoardService.js';
import ListService from '../services/ListService.js';
import CardService from '../services/CardService.js';
import ActivityService from '../services/ActivityService.js';

export default {
    state: {
        board: {},
        lists: [],
        activities: [],
        currCard: null,
    },
    getters: {
        getBoard: state => state.board,
        getLists: state => state.lists,
        getBoardActivities: state => state.board.activities,
        getCurrCard: state => state.currCard,
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board;
        },
        setCard(state, { card }) {
            state.currCard = card;
        },
        setLists(state, { lists }) {
            state.lists = lists
        },
        updateList(state, { savedList }) {
            const idx = state.lists.findIndex(list => list._id === savedList._id);
            state.lists.splice(idx, 1, savedList);
        },
        addList(state, { savedList }) {
            state.lists.push(savedList);
        },
        deleteList(state, { list }) {
            const idx = state.lists.findIndex(currList => currList._id === list._id);
            state.lists.splice(idx, 1);
        },
        updateCard(state, { savedCard }) {
            const cardList = state.lists.find(list => list._id === savedCard.listId);
            cardList.splice(idx, 1, savedList);
            const idx = state.lists.findIndex(list => list._id === cardList._id);
            state.lists.splice(idx, 1, cardList);
        },
        addCard(state, { savedCard }) {
            const cardList = state.lists.find(list => list._id === savedCard.listId);
            cardList.cards.push(savedCard);
            const idx = state.lists.findIndex(list => list._id === cardList._id);
            state.lists.splice(idx, 1, cardList);
        },
        addActivity(state, { savedActivity }) {
            state.activities.unshift(savedActivity)
        },
        setBoardActivities(state, { activities }) {
            state.activities = activities
        }
    },
    actions: {
        async loadBoard(context, { boardId }) {
            const { board, lists, activities } = await BoardService.getBoardById(boardId)
            console.log(lists);
            
            context.commit({ type: 'setBoard', board: board[0] });
            context.commit({ type: 'setLists', lists });
            context.commit({ type: 'setBoardActivities', activities });
            return board[0]
        },
        async saveBoard(context, { board }) {
            const savedBoard = await BoardService.saveBoard(board)
            context.commit({ type: 'setBoard', savedBoard: savedBoard[0] });
        },
        async updateLists(context, { lists }) {
            const savedLists = await ListService.updateLists(lists)
            console.log(savedLists[0]);
            context.commit({ type: 'setLists', lists: savedLists[0] });
        },
        saveList(context, { list }) {
            const isEdit = !!list._id
            return CardService.updateCards(list.cards)
                .then(cards => ListService.saveList(list)
                    .then(savedList => {
                        if (isEdit) context.commit({ type: 'updateList', savedList: savedList[0] });
                        else context.commit({ type: 'addList', savedList: savedList[0] });
                        return savedList[0]
                    }))
        },
        async saveNewList(context, { list }) {
            const savedList = await ListService.saveList(list)
            context.commit({ type: 'addList', savedList: savedList[0] });
            return savedList[0]
        },
        async saveCardToList(context, { card }) {
            const isEdit = !!card._id;
            const savedCard = await CardService.saveCard(card)
            if (isEdit) context.commit({ type: 'updateCard', savedCard: savedCard[0] });
            else context.commit({ type: 'addCard', savedCard: savedCard[0] });
            return savedCard[0]
        },
        loadCard(context, { cardId }) {
            return CardService.getCardById(cardId)
                .then(card => {                    
                    context.commit({ type: 'setCard', card: card[0] });
                    return card[0]
                })
        },
        async saveActivity(context, { activity }) {
            const savedActivity = await ActivityService.saveActivity(activity)
            console.log(savedActivity);
            context.commit({ type: 'addActivity', savedActivity: savedActivity[0]})
        }
    }
}

