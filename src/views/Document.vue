<template>
  <div>Document</div>
  <div>{{ slug }}</div>
</template>

<script>
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const slug = route.params.slug;

    return {
      slug,
    };
  },
};
</script>
