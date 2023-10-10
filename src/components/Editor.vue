<template>
  <div class="hidden h-screen min-h-[41.688rem] w-full flex-col md:flex">
    <div
      class="relative flex min-h-[2.625rem] w-full items-center bg-200 transition-colors duration-300 dark:bg-900"
      :class="[showPreview && ' justify-end']"
    >
      <Transition name="fade">
        <span
          v-if="showPreview"
          class="font-heading-s absolute left-4 top-3 uppercase text-500 transition-colors duration-300 dark:text-400"
          >preview</span
        >

        <div v-else class="flex w-full items-center">
          <span
            class="font-heading-s w-1/2 border-r border-solid border-300 pb-[0.875rem] pl-4 pt-3 uppercase text-500 transition-colors duration-300 dark:border-600 dark:text-400"
            >markdown</span
          >
          <span
            class="font-heading-s w-1/2 pb-[0.875rem] pl-4 pt-3 uppercase text-500 transition-colors duration-300 dark:text-400"
            >preview</span
          >
        </div>
      </Transition>
      <button
        type="button"
        class="absolute right-1 flex h-[2.625rem] w-10 items-center justify-center self-end"
        @click="togglePreview"
      >
        <Transition name="fade">
          <img
            v-if="showPreview"
            src="../assets/icon-hide-preview.svg"
            alt="hide preview icon"
            class="absolute left-3 top-[0.781rem] dark:hidden"
          />
          <img
            v-else
            src="../assets/icon-show-preview.svg"
            alt="show preview icon"
            class="absolute left-3 top-[0.875rem] dark:hidden"
          />
        </Transition>
        <Transition name="fade">
          <img
            v-if="showPreview"
            src="../assets/icon-hide-preview-dark.svg"
            alt="hide preview icon"
            class="absolute left-3 top-[0.781rem] hidden dark:block"
          />
          <img
            v-else
            src="../assets/icon-show-preview-dark.svg"
            alt="show preview icon"
            class="absolute left-3 top-[0.875rem] hidden dark:block"
          />
        </Transition>
      </button>
    </div>
    <div
      class="content has-submenu flex h-full w-screen bg-100 transition-colors duration-300 dark:bg-1000"
    >
      <Transition name="editor" mode="out-in">
        <div
          v-if="showPreview"
          class="output box-border h-full w-full overflow-auto px-12 pb-14 pt-6 xl:px-96"
          v-html="output"
        ></div>
        <div v-else class="flex w-full">
          <textarea
            class="font-markdown-code box-border h-full w-1/2 resize-none overflow-auto border-r border-solid border-300 bg-100 p-4 text-700 outline-none transition-colors duration-300 dark:border-600 dark:bg-1000 dark:text-400"
            @input="update"
            >{{ input }}</textarea
          >
          <div
            class="output box-border h-full w-1/2 overflow-auto px-5 pb-14 pt-4"
            v-html="output"
          ></div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import { debounce } from 'lodash-es';
import { ref, computed } from 'vue';
export default {
  props: {
    input: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // data
    const formattedInput = props.input.replace(/\\n/g, '\n');
    const formattedString = ref('');
    const input = ref(formattedInput);
    const output = computed(() => marked(input.value));
    const showPreview = ref(false);

    // methods
    const update = debounce(function (e) {
      input.value = e.target.value;
      console.log(e.target.value);

      formattedString.value = e.target.value.replace(/\n/g, '\\n');
      console.log(formattedString.value);
    }, 100);
    const togglePreview = () => {
      showPreview.value = !showPreview.value;
    };

    return { input, output, update, showPreview, togglePreview };
  },
};
</script>

<style lang="scss" scoped>
// transition styles
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.editor-enter-active,
.editor-leave-active {
  transition: opacity 0.3s ease;
}

.editor-enter-from,
.editor-leave-to {
  opacity: 0;
}
</style>
