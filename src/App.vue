<template>
  <div class="relative flex w-full overflow-x-hidden">
    <Sidebar />
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
        :isSidebarOpen="toggleModal"
      />
      <EditorMobile />
      <Editor />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Topbar from './components/Topbar.vue';
import Sidebar from './components/Sidebar.vue';
import EditorMobile from './components/EditorMobile.vue';
import Editor from './components/Editor.vue';

export default {
  setup() {
    const isSidebarOpen = ref(false);
    const isDeleteModalOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const toggleModal = () => {
      isDeleteModalOpen.value = !isDeleteModalOpen.value;
    };

    return { isSidebarOpen, isDeleteModalOpen, toggleSidebar, toggleModal };
  },
  components: {
    Topbar,
    Sidebar,
    EditorMobile,
    Editor,
  },
};
</script>
