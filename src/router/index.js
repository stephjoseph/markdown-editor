import { createRouter, createWebHistory } from 'vue-router';
import { projectFirestore } from '../firebase/config';

import Document from '../views/Document.vue';
import Home from '../views/Home.vue';

// Variable to store the latest document ID.
let latestDocumentId = null;

// Route guard to redirect to the latest document if not already fetched.
const redirectIfNotFetched = async (to, from, next) => {
  if (!latestDocumentId) {
    try {
      const querySnapshot = await projectFirestore
        .collection('documents')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get();
      const latestDocument = querySnapshot.docs[0];
      latestDocumentId = latestDocument.id;
    } catch (error) {
      console.error('Error fetching latest document:', error);
    }
    next(`/${latestDocumentId}`);
    latestDocumentId = null;
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: redirectIfNotFetched,
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
