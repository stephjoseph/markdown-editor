import { createRouter, createWebHistory } from 'vue-router';

import Document from '../views/Document.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/welcome',
    },
    {
      path: '/:slug',
      name: 'document',
      component: Document,
      props: true,
    },
  ],
});

export default router;
