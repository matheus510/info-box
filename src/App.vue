<template>
  <i-viewer></i-viewer>
</template>

<script>
  require('vue-image-lightbox/dist/vue-image-lightbox.min.css')
  import IViewer from './components/IViewer.vue'

  export default {
    components: {
      IViewer
    }
  }
</script>
<style>
mark {
  background-color: #ffff00;
  padding: 0;
}
</style>
