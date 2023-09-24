<template>
  <div class="flex bg-800">
    <button
      type="button"
      class="flex h-14 w-14 items-center justify-center bg-700"
      @click="handleClick"
    >
      <img
        v-if="!isSidebarOpen"
        class="h-[0.875rem] w-[1.438rem]"
        src="../assets/icon-menu.svg"
        alt="menu icon"
      />
      <img
        v-else
        class="h-[1.125rem] w-[1.125rem]"
        src="../assets/icon-close.svg"
        alt="close icon"
      />
    </button>
    <div class="flex w-full items-center justify-between pl-6 pr-2 md:pr-4">
      <div class="flex items-center gap-4">
        <div class="h-4 w-[0.875rem]">
          <img
            class="h-full w-full object-cover"
            src="../assets/icon-document.svg"
            alt="document icon"
          />
        </div>
        <span class="font-heading-m text-100">welcome.md</span>
      </div>
      <div class="flex items-center gap-4">
        <button class="h-[2.125rem] w-[2.125rem] p-2">
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
</template>

<script>
export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const handleClick = () => {
      context.emit('toggleSidebar');
    };

    return { handleClick };
  },
};
</script>
