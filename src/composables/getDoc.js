import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const getDoc = (id) => {
  let doc = ref(null);

  const load = async () => {
    try {
      let res = await projectFirestore.collection('documents').doc(id).get();

      doc.value = { ...res.data(), id: res.id };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { doc, load };
};

export default getDoc;
