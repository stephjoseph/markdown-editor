<template>
  <div v-if="doc">
    <div v-html="doc.content"></div>
  </div>
  <div v-else>Loading..</div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    slug: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute();
    const doc = ref(null);

    const getDocument = async () => {
      try {
        const response = await fetch('http://localhost:3000/documents');
        const data = await response.json();

        const filteredData = data.filter((doc) => doc.name === props.slug);
        doc.value = filteredData[0];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data when the component is mounted
    onMounted(() => {
      doc.value = null;
      getDocument();
    });

    watch(
      () => route.fullPath, // Use route.fullPath or any specific route property you want to watch
      () => {
        doc.value = null;
        getDocument();
      },
    );

    return { doc };
  },
};
</script>
