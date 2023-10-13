import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDocs = () => {
  const docs = ref([]);

  const load = async () => {
    try {
      const res = await projectFirestore
        .collection('documents')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
          let items = snap.docs.map((item) => {
            return {
              ...item.data(),
              id: item.id,
            };
          });

          docs.value = items;
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { docs, load };
};

export default getDocs;
