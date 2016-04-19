<template>
<titleview></titleview>
<div class="loader loader-inner square-spin" v-show="items.length==0">
  <div></div>
</div>
<ul>
  <li v-for="it in items"><a href="{{it.url}}">{{it.title}}</a></li>
</ul>
</template>

<script>
  import titleview from './components/titleview.vue'
  import hackapi from './store/api.js'
  export default {
    components: {
      titleview
    },
    created: function() {
      //API test
      hackapi.fetchItemsByPage(1).then(items => {
        this.items = items;
      })
      hackapi.on('newstories-updated', this.update)
    },
    destroyed: function() {
      hackapi.removeListener('newstories-updated', this.update)
    },
    data: function() {
      return {
        page: 1,
        items: []
      }
    },
    methods: {
      update: function() {
        hackapi.fetchItemsByPage(this.page).then(items => {
          console.dir(this.items) //TODO:for debug ,delete later
          this.items = items;
        })
      }
    }

  }
</script>
<style src="./main.scss" lang="sass"></style>
