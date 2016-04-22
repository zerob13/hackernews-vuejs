<template>
<titleview></titleview>
<router-view class="view" transition="expand" transition-mod=out-in>
</router-view>
</template>

<script>
  import titleview from './components/titleview.vue'
  export default {
    components: {
      titleview
    },
    created: function() {
    },
    destroyed: function() {
    },
    data: function() {
      return {
      }
    },
    methods: {
          }

  }
</script>
<style src="./main.scss" lang="sass"></style>
