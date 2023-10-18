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
      :doc="null"
    />
    <div
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
    const isSidebarOpen = ref(false);
    const isDeleteModalOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const toggleModal = () => {
      isDeleteModalOpen.value = !isDeleteModalOpen.value;
    };

    return {
      isSidebarOpen,
      isDeleteModalOpen,
      toggleSidebar,
      toggleModal,
    };
  },
  components: {
    Topbar,
    Spinner,
  },
};
</script>
