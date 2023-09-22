<template>
  <div class="flex w-full overflow-x-hidden">
    <Sidebar />
    <div
      class="z-10 flex w-full flex-col transition-transform duration-300"
      :class="[isSidebarOpen ? 'translate-x-[15.625rem]' : 'translate-x-0']"
    >
      <Topbar @toggleSidebar="toggleSidebar" />
      <div class="editor content has-submenu">
        <textarea class="input" :value="input" @input="update"></textarea>
        <div class="output" v-html="output"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import { debounce } from 'lodash-es';
import { ref } from 'vue';
import Topbar from './components/Topbar.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  setup() {
    const isSidebarOpen = ref(false);
    const input = ref(
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
    );

    const update = debounce(function (e) {
      this.input = e.target.value;
    }, 100);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
      console.log(isSidebarOpen.value);
    };

    return { input, update, isSidebarOpen, toggleSidebar };
  },

  computed: {
    output() {
      return marked(this.input);
    },
  },
  components: {
    Topbar,
    Sidebar,
  },
};
</script>

<style>
body {
  margin: 0;
  color: black;
}

.editor {
  height: 100vh;
  display: flex;
}

.input,
.output {
  overflow: auto;
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}

.input {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
