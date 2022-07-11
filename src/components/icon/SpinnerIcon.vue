<template>
	<div class="spinner"></div>
</template>
<style lang="scss">
.spinner {
  display: inline-block;
  width: 18px;
  aspect-ratio: 1/1;
  border: 2px solid $body-color;
  border-radius: 50%;
  border-top-color: $body-background;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>