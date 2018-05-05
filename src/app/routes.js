import { authRoutes } from './auth'

export default [
  ...authRoutes,
  {
    path: '/',
    redirect: '/auth/login'
  }
]
