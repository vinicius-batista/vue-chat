import store from '@/services/store'

export const beforeEach = (to, from, next) => {
  const { requiresAuth } = to.meta

  return store
    .isLogged()
    .then(() =>
      requiresAuth
        ? next()
        : next({ name: 'root' })
    )
    .catch(() =>
      requiresAuth
        ? next({ name: 'auth.login' })
        : next()
    )
}
