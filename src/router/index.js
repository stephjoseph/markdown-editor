import { createRouter, createWebHistory } from 'vue-router';

import Document from '../views/Document.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Document,
    },
    {
      path: '/:id',
      name: 'document',
      component: Document,
      props: true,
    },
  ],
});

export default router;
