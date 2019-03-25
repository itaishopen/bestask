import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import TaskApp from './views/TaskApp.vue'
import CardEdit from './views/CardEdit.vue'
import Board from './components/Board.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/about', name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    // { path: '/task', component: TaskApp },
    { path: '/board', component: TaskApp, meta: { showModal: false } },
    { path: '/board/:boardId', component: Board, meta: { showModal: false } },
    { path: '/card/edit/:cardId', component: CardEdit, meta: { showModal: true } },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
  ]
})
