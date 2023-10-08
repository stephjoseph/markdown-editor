import { ref } from 'vue';

const getDoc = (slug) => {
  let doc = ref(null);

  const load = async () => {
    try {
      // simulate delay
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      const response = await fetch('http://localhost:3000/documents');
      const data = await response.json();

      const filteredData = data.filter((doc) => doc.name === slug);
      doc.value = filteredData[0];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return { doc, load };
};

export default getDoc;
