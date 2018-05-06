import { authRoutes } from './auth'
import Root from './root'

export default [
  ...authRoutes,
  {
    path: '/',
    name: 'root',
    component: Root,
    meta: { requiresAuth: true }
  }
]
