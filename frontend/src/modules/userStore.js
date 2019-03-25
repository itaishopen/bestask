import UserService from '../services/UserService.js';
export default {
    state: {
        user: {},
        boards: []
    },
    getters: {
        isUserLoggedIn: state => !!state.user._id,
        loggedInUser: state => state.user
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
        setBoards(state, { boards }){
            state.boards = boards
        }
    },
    actions: {
        updateUser(context, { userId }) {
            return UserService.getUserAndBoard(userId)
                .then(({user, boards}) => {
                    context.commit({ type: 'setUser', user })
                    context.commit({ type: 'setBoards', boards })
                })
        },
        login(context, { user }) {
            return UserService.login(user)
                .then(user => {
                    if (user) {
                        context.commit({ type: 'setUser', user })
                    }
                    return user
                })
        },
        signup(context, { user }) {
            return UserService.signup(user)
                .then(user => {
                    if (user) {
                        context.commit({ type: 'setUser', user })
                    }
                    return user
                })
        }
    }
}