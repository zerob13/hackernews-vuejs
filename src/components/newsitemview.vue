<template>
<ul>
<div class="loader loader-inner square-spin" v-show="items.length==0">
  <div></div>
</div>
  <li v-for="it in items"><a href="{{it.url}}">{{it.title}}</a>
  </li>
</ul>
</template>
<script>
  import hackapi from '../store/api.js'
  export default {
    name: 'newsitem-view',
    data: function() {
      return {
        currentPage: '',
        page: 1,
        items: []
      }
    },
    route: {
      data: function(trans) {
        if (trans.from.name) {
          hackapi.removeListener(this.getListener(trans.from.name), this.update);
        }
        trans.next({
          currentPage: this.$route.name
        });
        this.items = [];
        this.page = 1;
        hackapi.on(this.getListener(this.currentPage), this.update);
        this.update();
      }
    },
    methods: {
      getListener: function(path) {
        return path + 'stories-updated';
      },
      update: function() {
        hackapi.fetchItemsByPage(this.page, this.currentPage).then(items => {
          this.items = items;
        })
      }

    }
  }
</script>
