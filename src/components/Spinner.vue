<template>
  <div class="spin"></div>
</template>

<style scoped>
.spin {
  display: block;
  width: 40px;
  height: 40px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #e46643;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotateZ(360deg);
  }
}
</style>
