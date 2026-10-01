import { createRouter, createWebHistory } from 'vue-router';

import WatchView from '@/views/WatchView.vue';
import LoginView from '@/views/LoginView.vue';
import ContentDetailView from '@/views/ContentDetailView.vue';
import AboutView from '@/views/AboutView.vue';
import IndexView from '@/views/IndexView.vue';
import BrowseView from '@/views/BrowseView.vue';
import LegalView from '@/views/LegalView.vue';
import HelpView from '@/views/HelpView.vue';
import NotFoundView from '@/views/404View.vue';
import ProfileView from '@/views/ProfileView.vue';
import SeatView from '@/views/SeatView.vue';
import OrderView from '@/views/OrderView.vue';
import SignupView from '@/views/SignupView.vue';
import OrderSuccessView from '@/views/OrderSuccessView.vue';
import { restoreSession } from '@/lib/auth.js';

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/browse',
    name: 'browse',
    component: BrowseView,
  },
  {
    path: '/content-detail',
    name: 'content-detail',
    component: ContentDetailView,
  },
  {
    path: '/view-seat',
    name: 'view-seat',
    component: SeatView,
  },
  {
    path: '/booking-order',
    name: 'booking-order',
    component: SeatView,
  },
  {
    path: '/payment-order',
    name: 'payment-order',
    component: OrderView,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/success-order',
    name: 'success-order',
    component: OrderSuccessView,
  },
  {
    path: '/404',
    name: '404',
    component: NotFoundView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true;

  const authenticated = await restoreSession();
  if (!authenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  return true;
});

export default router;
