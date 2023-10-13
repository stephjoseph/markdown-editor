import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDoc = (id) => {
  let doc = ref(null);

  const load = async () => {
    try {
      let res = await projectFirestore
        .collection('documents')
        .doc(id)
        .onSnapshot((snap) => {
          if (snap.exists) {
            doc.value = { ...snap.data(), id: snap.id };
          }
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { doc, load };
};

export default getDoc;
