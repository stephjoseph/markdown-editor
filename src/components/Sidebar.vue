<template>
  <div
    class="absolute left-0 top-0 h-screen min-h-[41.688rem] w-[15.625rem] min-w-[15.625rem] bg-900 p-6 transition-all"
  >
    <div class="flex h-full w-full flex-col justify-between">
      <div class="flex flex-col gap-[1.688rem]">
        <a
          href="/"
          class="font-['Commissioner'] text-[0.938rem] font-bold uppercase leading-[1.125rem] tracking-[5px] text-100 xl:hidden"
          >markdown</a
        >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-[1.813rem]">
            <div class="font-heading-s uppercase text-500">my documents</div>
            <button
              type="button"
              class="font-heading-m rounded-[4px] bg-orange py-3 text-white hover:bg-orange-hover active:bg-orange-hover"
            >
              + New Document
            </button>
          </div>
          <div class="flex flex-col gap-[1.625rem]">
            <a href="#" class="flex w-full items-center gap-4">
              <div class="h-4 w-[0.875rem]">
                <img
                  class="h-full w-full object-cover"
                  src="../assets/icon-document.svg"
                  alt="document icon"
                />
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-body text-500">01 April 2022</span>
                <span class="font-heading-m text-100"
                  >untitled-document.md</span
                >
              </div>
            </a>
            <a href="#" class="flex w-full items-center gap-4">
              <div class="h-4 w-[0.875rem]">
                <img
                  class="h-full w-full object-cover"
                  src="../assets/icon-document.svg"
                  alt="document icon"
                />
              </div>
              <div class="flex flex-col gap-1">
                <span class="font-body text-500">01 April 2022</span>
                <span class="font-heading-m text-100"
                  >untitled-document.md</span
                >
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative h-4 w-4">
          <Transition name="fade">
            <img
              v-if="darkMode"
              class="absolute left-0 top-0 h-full w-full object-cover"
              src="../assets/icon-dark-mode-active.svg"
              alt="dark mode icon"
            />
            <img
              v-else
              class="absolute left-0 top-0 h-full w-full object-cover"
              src="../assets/icon-dark-mode.svg"
              alt="dark mode icon"
            />
          </Transition>
        </div>
        <label class="switch">
          <input type="checkbox" @click="toggleMode" v-model="darkMode" />
          <div class="slider round"></div>
        </label>
        <div class="relative h-[1.125rem] w-[1.125rem]">
          <Transition name="fade">
            <img
              v-if="!darkMode"
              class="absolute left-0 top-0 h-full w-full object-cover"
              src="../assets/icon-light-mode-active.svg"
              alt="light mode icon"
            />
            <img
              v-else
              class="absolute left-0 top-0 h-full w-full object-cover"
              src="../assets/icon-light-mode.svg"
              alt="light mode icon"
            />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const darkMode = ref(false);

    const toggleMode = () => {
      darkMode.value = !darkMode.value;
    };

    return {
      darkMode,
      toggleMode,
    };
  },
};
</script>
<style lang="scss" scoped>
// switch styles
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    display: none;

    &:checked + .slider:before {
      -webkit-transform: translateX(0px);
      -ms-transform: translateX(0px);
      transform: translateX(0px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #5a6069;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &:before {
      position: absolute;
      content: '';
      height: 12px;
      width: 12px;
      left: 6px;
      bottom: 6px;
      background-color: white;
      -webkit-transition: 0.4s;
      transition: 0.4s;

      -webkit-transform: translateX(24px);
      -ms-transform: translateX(24px);
      transform: translateX(24px);
    }

    &.round {
      border-radius: 14.5px;

      &:before {
        border-radius: 50%;
      }
    }
  }
}

// transition styles
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
