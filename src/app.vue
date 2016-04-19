<template>
  <input type="text" v-model="text" />
  <div>Hello {{ text }}</div>
</template>

<script>
  export default {
    
    data() {
      return {
        text: 'vue'
      }
    }
    
  }
</script>
<style src="./main.scss" lang="sass"></style>
