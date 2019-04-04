import UserService from '../services/UserService.js';
export default {
    state: {
        user: {},
        boards: []
    },
    getters: {
        isUserLoggedIn: state => !!state.user._id,
        loggedInUser: state => state.user,
        getboards: state => state.boards
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
        setBoards(state, { boards }){
            state.boards = boards
        },
        logout(state, { userId }){
            if (userId === state.user._id) {
                state.user = {}
            }
        },
    },
    actions: {
        updateUser(context, { userId }) {            
            return UserService.getUserAndBoard(userId)
                .then(({user, boards}) => {                    
                    context.commit({ type: 'setUser', user: user[0] })
                    context.commit({ type: 'setBoards', boards })
                })
        },
        login(context, { user }) {
            return UserService.login(user)
                .then(user => {
                    if (user) {
                        context.commit({ type: 'setUser', user: user[0] })
                    }
                    return user
                })
        },
        logout(context, { userId }) {
            context.commit({type:"logout", userId})
        },
        signup(context, { user }) {
            return UserService.signup(user)
                .then(user => {                    
                    if (user) {
                        context.commit({ type: 'setUser', user: user[0] })
                    }
                    return user
                })
        }
    }
}