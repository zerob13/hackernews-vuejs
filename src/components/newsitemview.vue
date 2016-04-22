<template>
  <ul class="news-item-list" v-infinite-scroll="loadMore()" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="loader loader-inner square-spin" v-show="items.length==0">
      <div></div>
    </div>
    <Item v-for="it in items"
          :it="it"
          track-by="id"> 
    </Item>
        <div class="progress" v-show="busy">
          <div class="indeterminate"></div>
        </div>
  </ul>
</template>
<script>
  import hackapi from '../store/api.js'
  import Item from './item.vue'
  export default {
    name: 'newsitem-view',
    components: {
      Item
    },
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
          hackapi.removeListener(this.getListener(trans.from.name), this.updateAll);
        }
        trans.next({
          currentPage: this.$route.name
        });
        this.items = [];
        this.page = 1;
        this.noMoreItem = false;
        this.busy = true;
        document.title = "HackerNews > " + trans.to.name;
        this.update();
        hackapi.on(this.getListener(this.currentPage), this.updateAll);
      }
    },
    computed: {


    },
    methods: {
      getListener: function(path) {
        return path + 'stories-updated';
      },
      updateAll: function() {
        console.log('new message arrived');
        hackapi.fetchAllByPage(this.page, this.currentPage).then(items => {
          console.dir(items)
          if (items.length == 0) {
            this.noMoreItem = true;
          } else {
            this.noMoreItem = false; //new data coming
          }
          this.items = [];
          items.forEach((item) => {
            if (item) {
              this.items.push(item);
            }
          })

          this.busy = false;
        })

      },
      update: function() {
        hackapi.fetchItemsByPage(this.page, this.currentPage).then(items => {
          console.dir(items)
          if (items.length == 0) {
            this.noMoreItem = true;
          } else {
            this.noMoreItem = false; //new data coming
          }
          items.forEach((item) => {
              if (item) {
                this.items.push(item);
              }
            })
            //this.items = this.items.concat(tArray);
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
