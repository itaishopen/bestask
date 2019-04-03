import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import TaskApp from './views/TaskApp.vue'
import EditCard from './views/CardEdit.vue'
import Board from './components/Board.vue'
import BoardArchive from './components/BoardArchive.vue'


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
    { 
      path: '/board', 
      name: "Boards" ,
      component: TaskApp 
    },
    { path: '/board/:boardId/archive',
      name: 'Board archive',
      component: BoardArchive,
      meta: { showModal: false } ,
      children: [
        { 
          path: '/board/:boardId/archive/card/edit/:cardId', 
          name: "Archive Card Edit" , 
          component: {
            page: BoardArchive, 
            archive_card: EditCard
          } , 
          meta: { showModal: true } 
        }
      ]
    },
    { 
      path: '/board/:boardId', 
      name: "Board" , 
      component: Board , 
      meta: { showModal: false } ,
      children: [
        { 
          path: '/board/:boardId/card/edit/:cardId', 
          name: "Card Edit" , 
          component: {
            page: Board, 
            card: EditCard
          } , 
          meta: { showModal: true } 
        }
      ]
    },
    
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
  ]
})
