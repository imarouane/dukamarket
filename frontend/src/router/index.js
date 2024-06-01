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
      requiresAuth: true
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
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
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
  const token = userStore.userToken
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && token) {
    next({ name: 'app.dashboard' })
  } else {
    next()
  }
})

export default router
