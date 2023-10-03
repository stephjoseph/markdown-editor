import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Document from '../views/Document.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/:slug',
      name: 'document',
      component: Document,
    },
  ],
});

export default router;
