import Room from './views/Room'

export default [
  {
    name: 'room',
    path: '/room/:id',
    component: Room,
    meta: { requiresAuth: true }
  }
]
