<template>
  <ul class="news-item-list" v-infinite-scroll="loadMore()" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
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
        busy: true,
        noMoreItem: false,
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
        this.noMoreItem = false;
        this.busy = true;
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
          console.dir(items)
          if (items.length == 0) {
            this.noMoreItem = true;
          } else {
            this.noMoreItem = false; //new data coming
          }
          this.items = this.items.concat(items);
          this.busy = false;
        })
      },
      loadMore: function() {
        if (this.noMoreItem) {
          console.log('no more data...')
          return;
        }
        this.busy = true;
        console.log('updating...')
        this.page += 1;
        this.update();
      }

    }
  }
</script>
