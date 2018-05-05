import Login from './views/Login.vue'

export default [
  {
    path: '/auth/login',
    name: 'auth.login',
    component: Login,
    meta: { requiresAuth: false }
  }
]
