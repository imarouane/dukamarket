import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/user/HomeView.vue')
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('@/components/admin/AppLayout.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    children: [
      {
        path: 'dashboard',
        name: 'app.dashboard',
        component: () => import('@/views/admin/DashboardView.vue')
      },
      {
        path: 'products',
        name: 'app.products',
        component: () => import('@/views/admin/ProductsView.vue')
      },
      {
        path: 'users',
        name: 'app.users',
        component: () => import('@/views/admin/UsersView.vue')
      },
      {
        path: 'reports',
        name: 'app.reports',
        component: () => import('@/views/admin/ReportsView.vue')
      }
    ]
  },
  {
    path: '/app/admin/login',
    name: 'adminLogin',
    component: () => import('@/views/admin/LoginView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/LoginView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/user/RegisterView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/password/forgot',
    name: 'password.forgot',
    component: () => import('@/views/ForgotPasswordView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/password/reset/:token',
    name: 'password.reset',
    component: () => import('@/views/ResetPasswordView.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn
  const isAdmin = userStore.isAdmin
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' })
  } else if (to.meta.requiresGuest && isAdmin && isLoggedIn) {
    next({name: 'app.dashboard'})
  } else if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
