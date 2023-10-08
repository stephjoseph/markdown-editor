<template>
  <div v-if="doc" class="bg-1000">
    <EditorMobile :input="doc.content" />
    <Editor :input="doc.content" />
  </div>
  <div v-else class="h-screen min-h-[41.688rem] w-full bg-black text-100">
    <Spinner />
  </div>
</template>

<script>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import EditorMobile from '../components/EditorMobile.vue';
import Editor from '../components/Editor.vue';
import Spinner from '../components/Spinner.vue';
import getDoc from '../composables/getDoc';

export default {
  props: {
    slug: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute();

    let { doc, load } = getDoc(props.slug);

    load();

    watch(
      () => route.fullPath, // Use route.fullPath or any specific route property you want to watch
      () => {
        location.reload();
      },
    );

    return { doc };
  },
  components: {
    Editor,
    EditorMobile,
    Spinner,
  },
};
</script>
