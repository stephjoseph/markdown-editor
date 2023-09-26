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
export default {
  setup() {
    // data
    const input = ref(
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
    );
    const output = computed(() => marked(input.value));
    const showPreview = ref(false);

    // methods
    const update = debounce(function (e) {
      input.value = e.target.value;
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
