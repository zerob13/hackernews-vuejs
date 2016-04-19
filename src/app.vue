<template>
<titleview></titleview>
</template>

<script>
  import titleview from './components/titleview.vue'
  export default {
    components: {
      titleview
    },
    data: function() {
      return {
        text: 'hello world'
      }
    }

  }
</script>
<style src="./main.scss" lang="sass"></style>
