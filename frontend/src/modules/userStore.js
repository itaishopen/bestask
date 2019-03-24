import UserService from '../services/UserService.js';
export default {
    state: {
        user: {}
    },
    getters: {
        isUserLoggedIn: state => !!state.user._id,
        loggedInUser: state => state.user
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        }
    },
    actions: {
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