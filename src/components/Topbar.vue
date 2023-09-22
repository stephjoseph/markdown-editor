<template>
  <div class="flex bg-800">
    <button
      type="button"
      class="h-14 w-14 bg-700 px-4 py-5"
      @click="handleClick"
    >
      <img src="../assets/icon-menu.svg" alt="menu icon" />
    </button>
    <div class="flex w-full items-center justify-between pl-6 pr-2">
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
          class="h-10 w-10 rounded-[4px] bg-orange p-3 hover:bg-orange-hover"
        >
          <img src="../assets/icon-save.svg" alt="save icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, context) {
    const handleClick = () => {
      context.emit('toggleSidebar');
    };

    return { handleClick };
  },
};
</script>
