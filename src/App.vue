<template>
  <!-- <div class="relative flex w-full overflow-x-hidden">
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
        :isSidebarOpen="isSidebarOpen"
      />
      <EditorMobile />
      <Editor />
    </div>
  </div> -->
  <div v-if="documents.length">
    <div v-for="document in documents" :key="document.name">
      <RouterLink :to="{ name: 'document', params: { slug: document.name } }">
        {{ document.name }}.md
      </RouterLink>
    </div>
  </div>

  <RouterView />
</template>

<script>
import { ref, onMounted } from 'vue';
import { RouterView, RouterLink } from 'vue-router';
import Topbar from './components/Topbar.vue';
import Sidebar from './components/Sidebar.vue';
import EditorMobile from './components/EditorMobile.vue';
import Editor from './components/Editor.vue';

export default {
  setup() {
    const isSidebarOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const documents = ref([]);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const toggleModal = () => {
      isDeleteModalOpen.value = !isDeleteModalOpen.value;
    };

    const getDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/documents');
        const data = await response.json();
        documents.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data when the component is mounted
    onMounted(() => {
      getDocuments();
    });

    return {
      isSidebarOpen,
      isDeleteModalOpen,
      toggleSidebar,
      toggleModal,
      documents,
    };
  },
  components: {
    Topbar,
    Sidebar,
    EditorMobile,
    Editor,
  },
};
</script>
