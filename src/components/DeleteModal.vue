<template>
  <div
    class="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-1000/50"
    @click.self="closeModal"
  >
    <div class="flex w-[21.438rem] flex-col gap-4 rounded-[4px] bg-100 p-6">
      <div class="font-preview-h4 text-700">Delete this document?</div>
      <p class="font-preview-paragraph text-500">
        Are you sure you want to delete the
        <strong><em>‘welcome.md’</em></strong> document and its contents? This
        action cannot be reversed.
      </p>
      <button
        class="text-heading-m h-10 w-full rounded-[4px] bg-orange capitalize text-100 hover:bg-orange-hover active:bg-orange-hover"
      >
        confirm & delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const closeModal = () => {
      context.emit('closeModal');
    };

    console.log(props.id);

    return { closeModal };
  },
};
</script>

<style lang="scss" scoped></style>
