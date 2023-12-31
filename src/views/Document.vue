<template>
  <div
    class="z-10 flex h-screen min-h-[41.688rem] w-full flex-col transition-transform duration-300"
    :class="[
      isSidebarOpen ? 'translate-x-[15.625rem]' : 'translate-x-0',
      isDeleteModalOpen ? 'overflow-hidden' : 'overflow-scroll',
    ]"
  >
    <Topbar
      @toggleSidebar="toggleSidebar"
      @toggleModal="toggleModal"
      @save="handleSave"
      :isSidebarOpen="isSidebarOpen"
      :doc="doc"
    />
    <div v-if="doc" class="bg-1000">
      <EditorMobile ref="editorMobile" :doc="doc" />
      <Editor ref="editor" :doc="doc" />
    </div>
    <div
      v-else
      class="flex h-screen min-h-[41.688rem] w-full items-center justify-center bg-black text-100"
    >
      <Spinner />
    </div>
  </div>
</template>

<script>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import Topbar from '../components/Topbar.vue';
import EditorMobile from '../components/EditorMobile.vue';
import Editor from '../components/Editor.vue';
import Spinner from '../components/Spinner.vue';
import getDoc from '../composables/getDoc';

export default {
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const route = useRoute();
    const isSidebarOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    let { doc, load } = getDoc(props.id);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const toggleModal = () => {
      isDeleteModalOpen.value = !isDeleteModalOpen.value;
    };

    load();

    watch(
      () => route.fullPath, // Use route.fullPath or any specific route property you want to watch
      () => {
        location.reload();
      },
    );

    return {
      doc,
      isSidebarOpen,
      isDeleteModalOpen,
      toggleSidebar,
      toggleModal,
    };
  },
  components: {
    Topbar,
    Editor,
    EditorMobile,
    Spinner,
  },
  methods: {
    handleSave() {
      if (window.innerWidth < 768) {
        this.$refs.editorMobile.saveChanges();
      } else {
        this.$refs.editor.saveChanges();
      }
    },
    handleKeyPress(e) {
      // Check if the key pressed is "S" and the Ctrl (or Command) key is pressed
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.handleSave();
      }
    },
  },
  created() {
    // Add a global event listener for keydown
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeUnmount() {
    // Remove the event listener when the component is unmounted
    window.removeEventListener('keydown', this.handleKeyPress);
  },
};
</script>
