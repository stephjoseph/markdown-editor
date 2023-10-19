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
            <span
              v-if="!isEditing"
              class="font-heading-m text-100"
              @click="startEditing"
              >{{ docName }}.md</span
            >
            <input
              v-else
              v-model="docName"
              @blur="stopEditing"
              @keydown.enter="stopEditing"
              class="font-heading-m w-36 border-b border-solid border-100 bg-transparent pb-1 text-100 caret-orange focus:outline-none md:w-[15rem] xl:w-[25rem]"
            />
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
            @click="handleSave"
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
import { ref, watch } from 'vue';
import DeleteModal from './DeleteModal.vue';
import { projectFirestore } from '../firebase/config';
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
    const docName = ref(props.doc && props.doc.name);
    const isDeleteModalOpen = ref(false);
    const isEditing = ref(false);

    const handleClick = () => {
      context.emit('toggleSidebar');
    };

    const saveChanges = async () => {
      try {
        await projectFirestore
          .collection('documents')
          .doc(props.doc.id)
          .update({ name: docName.value });
      } catch (error) {
        console.error('Error saving name:', error);
      }
    };

    const startEditing = () => {
      isEditing.value = true;
    };

    const stopEditing = () => {
      isEditing.value = false;

      docName.value = slugify(docName.value);

      saveChanges();
    };

    const toggleModal = () => {
      isDeleteModalOpen.value = !isDeleteModalOpen.value;
      context.emit('toggleModal');
    };

    const handleSave = () => {
      context.emit('save');
    };

    const slugify = (text) => {
      return text
        .toString()
        .normalize('NFD') // Normalize unicode characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
        .toLowerCase() // Convert to lowercase
        .trim() // Trim leading and trailing spaces
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '') // Remove non-word characters except hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
    };

    // Watch for changes in the doc prop and update the input value accordingly
    watch(
      () => props.doc,
      (newVal) => {
        docName.value = newVal.name;
      },
    );

    return {
      isDeleteModalOpen,
      isEditing,
      handleClick,
      toggleModal,
      handleSave,
      startEditing,
      stopEditing,
      docName,
    };
  },
  components: {
    DeleteModal,
    DeleteModal,
  },
  emits: ['toggleSidebar', 'toggleModal', 'save'],
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
