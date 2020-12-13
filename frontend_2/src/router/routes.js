
const routes = [
  {
    mode: 'history',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'home', path: '/', component: () => import('pages/Index.vue') },
      { name: 'register', path: '/register', component: () => import('pages/auth/signup.vue') },
      { name: 'login', path: '/login', component: () => import('pages/auth/login.vue') },
      { name: 'forgot', path: '/forgot', component: () => import('pages/auth/forgot.vue') },
      { name: 'reset', path: '/reset/:token', component: () => import('pages/auth/reset.vue'), props: true },
      { name: 'profile', path: '/profile/:id', component: () => import('pages/profile/profile.vue'), props: true },
      { name: 'setting', path: '/setting/:id', component: () => import('pages/profile/setting.vue'), props: true }
    ]
  },

  {
    mode: 'history',
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
