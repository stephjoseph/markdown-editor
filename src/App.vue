<template>
  <div class="relative flex w-full overflow-x-hidden">
    <Sidebar />
    <div
      class="z-10 flex h-screen min-h-[41.688rem] w-full flex-col overflow-scroll transition-transform duration-300"
      :class="[isSidebarOpen ? 'translate-x-[15.625rem]' : 'translate-x-0']"
    >
      <Topbar @toggleSidebar="toggleSidebar" :isSidebarOpen="isSidebarOpen" />
      <Editor />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Topbar from './components/Topbar.vue';
import Sidebar from './components/Sidebar.vue';
import Editor from './components/Editor.vue';

export default {
  setup() {
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    return { isSidebarOpen, toggleSidebar };
  },
  components: {
    Topbar,
    Sidebar,
    Editor,
  },
};
</script>
