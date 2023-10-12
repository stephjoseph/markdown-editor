import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDocs = () => {
  const docs = ref([]);

  const load = async () => {
    try {
      const res = await projectFirestore.collection('documents').orderBy('createdAt', 'desc').get();

      docs.value = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { docs, load };
};

export default getDocs;
