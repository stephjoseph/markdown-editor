import { ref } from 'vue';

const getDocs = () => {
  const docs = ref([]);

  const load = async () => {
    try {
      // simulate delay
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      const response = await fetch('http://localhost:3000/documents');
      const data = await response.json();

      docs.value = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { docs, load };
};

export default getDocs;
