import Login from './views/Login'
import Register from './views/Register'

export default [
  {
    path: '/auth/login',
    name: 'auth.login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: Register,
    meta: { requiresAuth: false }
  }
]
