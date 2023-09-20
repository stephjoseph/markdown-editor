<template>
  <nav>
    <div class="bg-800 flex">
      <button type="button" class="bg-700 h-14 w-14 px-4 py-5">
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
            class="bg-orange hover:bg-orange-hover h-10 w-10 rounded-[4px] p-3"
          >
            <img src="../assets/icon-save.svg" alt="save icon" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>
