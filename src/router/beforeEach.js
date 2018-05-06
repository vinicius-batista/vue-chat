import store from '@/services/store'

export const beforeEach = (to, from, next) => {
  const { requiresAuth } = to.meta

  return store
    .isLogged()
    .then(() => {
      if (requiresAuth) {
        return next()
      }

      return next({ name: 'root' })
    })
    .catch(() => {
      if (requiresAuth) {
        return next({ name: 'auth.login' })
      }

      return next()
    })
}
