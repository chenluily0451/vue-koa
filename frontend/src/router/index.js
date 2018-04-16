import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Users from '../components/Users.vue'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ls_login')
  if (to.path !== '/' && to.path !== '/register') {
    if (token && token !== 'null') {
      // Bearer是JWT的认证头部信息
      Vue.http.options.headers = {}
      Vue.http.options.headers.Authorization = 'Bearer ' + token
      next()
    } else {
      console.log('asdas')
      return next({path: '/'})
    }
  }
  next()
})

export default router
