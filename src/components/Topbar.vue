<template>
  <div class="flex bg-800">
    <button
      type="button"
      class="flex h-14 w-14 items-center justify-center bg-700 md:h-[4.5rem] md:w-[4.5rem]"
      @click="handleClick"
    >
      <img
        v-if="!isSidebarOpen"
        class="h-[0.875rem] w-[1.438rem] md:h-[1.125rem] md:w-[1.875rem]"
        src="../assets/icon-menu.svg"
        alt="menu icon"
      />
      <img
        v-else
        class="h-[1.125rem] w-[1.125rem] md:h-[1.375rem] md:w-[1.375rem]"
        src="../assets/icon-close.svg"
        alt="close icon"
      />
    </button>
    <div class="flex w-full items-center">
      <div class="hidden w-[11.5rem] items-center pl-6 pr-[1.75rem] xl:block">
        <a
          href="/"
          class="hidden font-['Commissioner'] text-[0.938rem] font-bold uppercase leading-[1.125rem] tracking-[5px] text-100 xl:block"
          >markdown</a
        >
      </div>
      <div class="pointer-events-none hidden h-10 w-px bg-600 xl:block"></div>
      <div
        v-if="doc"
        class="flex w-full items-center justify-between pl-6 pr-2 md:pr-4"
      >
        <div class="flex items-center gap-4">
          <div class="h-4 w-[0.875rem]">
            <img
              class="h-full w-full object-cover"
              src="../assets/icon-document.svg"
              alt="document icon"
            />
          </div>
          <div class="flex flex-col gap-1">
            <span class="font-body hidden capitalize text-500 md:block"
              >document name</span
            >
            <span class="font-heading-m text-100">{{ doc.name }}.md</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button
            class="h-[2.125rem] w-[2.125rem] p-2"
            type="button"
            @click="toggleModal"
          >
            <img src="../assets/icon-delete.svg" alt="delete icon" />
          </button>
          <button
            class="flex h-10 w-10 items-center justify-center rounded-[4px] bg-orange hover:bg-orange-hover md:w-[9.5rem] md:gap-2"
          >
            <img src="../assets/icon-save.svg" alt="save icon" />
            <span class="font-heading-m hidden capitalize text-100 md:inline"
              >save changes</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
  <Transition name="fade">
    <div v-if="isDeleteModalOpen">
      <DeleteModal @closeModal="toggleModal" :id="doc.id" :name="doc.name" />
    </div>
  </Transition>
</template>

<script>
import { ref } from 'vue';
import DeleteModal from './DeleteModal.vue';
import { useRoute } from 'vue-router';
export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
    doc: {
      type: Object,
      default: {},
    },
  },
  setup(props, context) {
    const isDeleteModalOpen = ref(false);

    const handleClick = () => {
      context.emit('toggleSidebar');
    };

    const toggleModal = () => {
      isDeleteModalOpen.value = !isDeleteModalOpen.value;
      context.emit('toggleModal');
    };

    return { isDeleteModalOpen, handleClick, toggleModal };
  },
  components: {
    DeleteModal,
    DeleteModal,
  },
};
</script>

<style lang="scss" scoped>
// transition styles
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
