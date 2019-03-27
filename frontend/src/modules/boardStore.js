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
            const cardIdx =  cardList.cards.findIndex(card => card._id === savedCard._id)            
            cardList.cards.splice(cardIdx, 1, savedCard);
            const listIdx = state.lists.findIndex(list => list._id === cardList._id);
            state.lists.splice(listIdx, 1, cardList);
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
        loadBoard(context, { boardId }) {
            return BoardService.getBoardById(boardId)
                .then(({ board, lists, activities }) => {
                    console.log(board, lists, activities);

                    context.commit({ type: 'setBoard', board: board[0] });
                    context.commit({ type: 'setLists', lists });
                    context.commit({ type: 'setBoardActivities', activities });
                    return board[0]
                })
        },
        saveBoard(context, { board }) {
            return BoardService.saveBoard(board).then(savedBoard => {
                context.commit({ type: 'setBoard', savedBoard: savedBoard[0] })
            })
        },
        updateLists(context, { lists }) {
            return ListService.updateLists(lists).then(savedLists => {
                console.log(savedLists);
                context.commit({ type: 'setLists', lists: savedLists });
            })
        },
        saveList(context, { list }) {
            const isEdit = !!list._id
            return CardService.updateCards(list.cards)
                .then(cards => ListService.saveList(list)
                    .then(savedList => {
                        console.log(savedList, cards);

                        if (isEdit) context.commit({ type: 'updateList', savedList: savedList[0] });
                        else context.commit({ type: 'addList', savedList: savedList[0] });
                        return savedList[0]
                    }))
        },
        saveNewList(context, { list }) {
            return ListService.saveList(list).then(savedList => {
                context.commit({ type: 'addList', savedList: savedList[0] });
                return savedList[0]
            })
        },
        saveCardToList(context, { card }) {
            const isEdit = !!card._id;
            return CardService.saveCard(card)
                .then(savedCard => {
                    console.log(savedCard);
                    
                    if (isEdit) context.commit({ type: 'updateCard', savedCard: savedCard[0] });
                    else context.commit({ type: 'addCard', savedCard: savedCard[0] });
                    return savedCard[0]
                })
        },
        loadCard(context, { cardId }) {
            return CardService.getCardById(cardId)
                .then(card => {
                    context.commit({ type: 'setCard', card: card[0] });
                    return card[0]
                })
        },
        saveActivity(context, { activity }) {
            return ActivityService.saveActivity(activity).then(savedActivity => {
                context.commit({ type: 'addActivity', savedActivity: savedActivity[0] })
            })
        }
    }
}

