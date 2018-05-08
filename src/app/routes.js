import { authRoutes } from './auth'
import { roomsRoutes } from './rooms'
import Root from './root'

export default [
  ...authRoutes,
  {
    path: '/',
    name: 'root',
    component: Root,
    meta: { requiresAuth: true },
    children: [
      ...roomsRoutes
    ]
  }
]
