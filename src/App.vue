<template>
  <div class="relative flex w-full overflow-x-hidden">
    <Sidebar :docs="docs" />
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import Sidebar from './components/Sidebar.vue';
import getDocs from './composables/getDocs';

export default {
  setup() {
    const { docs, load } = getDocs();

    load();

    return {
      docs,
    };
  },
  components: {
    Sidebar,
  },
};
</script>
