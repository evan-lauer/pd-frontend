import { createRouter, createWebHistory } from 'vue-router';

import HomeView from 'src/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('src/views/AboutView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('src/views/CalendarView.vue')
    }
  ]
});

export default router;
