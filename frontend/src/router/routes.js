// import auth from '@/src/middleware/auth'
// import log from '@/src/middleware/log'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue') },
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/register', component: () => import('pages/Signup.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/NewLayout.vue'),
    children: [
      { path: '/user/settings', component: () => import('pages/Settings.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
