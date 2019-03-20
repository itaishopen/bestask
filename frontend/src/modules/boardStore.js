import BoardService from '../services/BoardSerivce.js';

export default {
    state: {
        board:{}
    },
    getters: {
        boardToDisplay: state => state.board
    },
    mutations: {
        setBoard(state, { board }) {
            state.board = board
        }
    },
    actions: {
        loadBoard(context, {boardId}) {
            return BoardService.getBoardById(boardId)
                .then(board => {
                    console.log({ board })
                    context.commit({ type: 'setBoard', board })
                })
        }
    }
}

