<template>
  <div class="flex h-screen min-h-[41.688rem] w-full flex-col md:hidden">
    <div
      class="relative flex w-full items-center justify-end bg-200 pl-4 pr-1 transition-colors duration-300 dark:bg-900"
    >
      <Transition name="fade">
        <span
          v-if="showPreview"
          class="font-heading-s absolute left-4 top-3 uppercase text-500 transition-colors duration-300 dark:text-400"
          >preview</span
        >
        <span
          v-else
          class="font-heading-s absolute left-4 top-3 uppercase text-500 transition-colors duration-300 dark:text-400"
          >markdown</span
        >
      </Transition>
      <button
        type="button"
        class="relative flex h-10 w-10 items-center justify-center self-end"
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
          class="output box-border h-full w-full overflow-auto px-5 pb-14 pt-4"
          v-html="output"
        ></div>
        <textarea
          v-else
          class="font-markdown-code box-border h-full w-full resize-none overflow-auto bg-100 p-4 text-700 outline-none transition-colors duration-300 dark:bg-1000 dark:text-400"
          :value="input"
          @input="update"
        ></textarea>
      </Transition>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import { debounce } from 'lodash-es';
import { ref, computed } from 'vue';
import { projectFirestore } from '../firebase/config';
export default {
  props: {
    doc: {
      type: Object,
      default: {},
    },
  },
  setup(props) {
    // data
    const formattedInput = props.doc.content.replace(/\\n/g, '\n');
    const formattedString = ref('');
    const input = ref(formattedInput);
    const output = computed(() => marked(input.value));
    const showPreview = ref(false);

    // methods
    const update = debounce(function (e) {
      input.value = e.target.value;
      formattedString.value = e.target.value.replace(/\n/g, '\\n');
    }, 100);
    const togglePreview = () => {
      showPreview.value = !showPreview.value;
    };

    return { input, output, update, showPreview, togglePreview };
  },
  methods: {
    async saveChanges() {
      let formattedInput = this.input.replace(/\n/g, '\\n');

      try {
        await projectFirestore
          .collection('documents')
          .doc(this.doc.id)
          .update({ content: formattedInput });
      } catch (error) {
        console.error('Error saving document:', error);
      }
    },
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
