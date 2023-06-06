import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import detail from '../views/detail.vue'
import addkosan from '../views/addkosan.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'regis',
      component: register
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/addKosan',
      name: 'addkosan',
      component: addkosan
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token
  if ((to.name == 'login' && isAuthenticated) || (to.name == 'register' && isAuthenticated)) {
    next('/')
  } else if (!to.name) {
    next('/pageNotFound')
  } else {
    next()
  }
})
export default router
