import BoardService from '../services/BoardService.js';
import ListService from '../services/ListService.js';
import CardService from '../services/CardService.js';
import ActivityService from '../services/ActivityService.js';

export default {
    state: {
        board: {},
        lists: [],
        activities: []
    },
    getters: {
        getBoard: state => state.board,
        getLists: state => state.lists,
        getBoardActivities: state => state.board.activities,
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board;
        },
        addBoard(state, { savedBoard }) {
            state.board = savedBoard;
        },
        updateBoard(state, { savedBoard }) {
            state.board = savedBoard;
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
        // updateCard(state, { savedCard }) {
        //     const cardList = state.lists.find(list => list._id === savedCard.listId);
        //     cardList.split(idx, 1, savedList);
        //     const idx = state.lists.findIndex(list => list._id === cardList._id);
        //     state.lists.split(idx, 1, cardList);
        // },
        addCard(state, { savedCard }) {
            console.log(savedCard);
                    
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
                    context.commit({ type: 'setBoard', board: board[0] });
                    context.commit({ type: 'setLists', lists });
                    context.commit({ type: 'setBoardActivities', activities });
                    return board[0]
                })
        },
        saveBoard(context, { board }) {
            const isEdit = !!board._id
            return BoardService.saveBoard(board)
                .then(savedBoard => {
                    if (isEdit) context.commit({ type: 'updateBoard', savedBoard: savedBoard[0] });
                    else context.commit({ type: 'addBoard', savedBoard: savedBoard[0] });
                })
        },
        updateLists(context, { lists }) {
            return ListService.updateLists(lists)
                .then(lists => {                    
                    context.commit({ type: 'setLists', lists: lists });
                })
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
        saveNewList(context, { list }) {
            return ListService.saveList(list)
                .then(savedList => {
                    context.commit({ type: 'addList', savedList: savedList[0] });
                    return savedList[0]
                })
        },
        saveCardToList(context, { card }) {
            const isEdit = !!card._id;            
            return CardService.saveCard(card)
                .then(savedCard => {
                    if (isEdit) context.commit({ type: 'updateCard', savedCard });
                    else context.commit({ type: 'addCard', savedCard });
                    return savedCard
                })
        },
        saveActivity(context, { activity }) {
            return ActivityService.saveActivity(activity)
                .then(savedActivity => {
                    context.commit({ type: 'addActivity', savedActivity })
                })
        }
    }
}

