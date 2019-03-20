import BoardService from '../services/BoardService';
import ListService from '../services/ListService';

export default {
    state: {
        board: {},
        lists: []
    },
    getters: {
        getBoard: state => state.board,
        getLists: state => state.lists,
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board;
        },
        setLists(state, { lists }) {
            state.lists = lists
        },
        updateList(state, { list }) {
            const idx = state.lists.findIndex(currList => currList._id === list._id);
            state.lists.split(idx, 1, list);
        },
        addList(state, { list }) {
            state.lists.push(list);
        },
        deleteList(state, { list }) {
            const idx = state.lists.findIndex(currList => currList._id === list._id);
            state.lists.split(idx, 1);
        },
    },
    actions: {
        loadBoard(context, { boardId }) {
            return BoardService.getBoardById(boardId)
                .then(({ board, lists }) => {
                    context.commit({ type: 'setBoard', board });
                    context.commit({ type: 'setLists', lists });
                })
        },
        updateLists(context, { lists }) {
            return ListService.updateLists(lists)
                .then(lists => {
                    context.commit({ type: 'setLists', lists });
                })
        },
        saveList(context, { list }) {
            const isEdit = !!list._id
            return ListService.saveList(list)
                .then(list => {
                    if (isEdit) context.commit({ type: 'updateList', list });
                    else context.commit({ type: 'addList', list });
                })
        }
    }
}

