<template>
  <div class="detail-view" v-show="item">
     <div class="progress" v-show="!itemLoaded">
       <div class="indeterminate"></div>
     </div>
    <Item :it="item"></Item>
    <p class="itemtext" v-if="hasText" v-html="item.text"></p>
    <ul class="poll-options" v-if="pollOptions">
      <li v-for="option in pollOptions">
        <p>{{option.text}}</p>
        <p class="subtext">{{option.score}} points</p>
      </li>
    </ul>
    <ul class="comments" v-if="comments">
      <Comment
        v-for="comment in comments"
        :comment="comment">
      </Comment>
    </ul>
    <p v-show="comments.length==0&&!isJob&&itemLoaded">No comments yet.</p>
  </div>
</template>
<script>
  import hackapi from '../store/api.js'
  import Comment from './newsitemcomments.vue'
  import Item from './item.vue'
  export default {
    name: 'newsitem-detail',
    components: {
      Item,
      Comment
    },
    data: function() {
      return {
        item: {},
        comments: [],
        pollOptions: null
      }
    },
    route: {
      data: function(trans) {
        return hackapi.fetchItem(trans.to.params.id).then(item => {
          document.title = item.title;
          return {
            item,
            comments: hackapi.fetchItems(item.kids),
            pollOptions: item.type === 'poll' ? hackapi.fetchItems(item.parts) : null
          };
        })
      }
    },
    methods: {},
    computed: {
      isJob() {
        return this.item.type === 'job';
      },
      hasText() {
        return this.item.hasOwnProperty('text');
      },
      itemLoaded(){
        return this.item.hasOwnProperty('id');
      }
    }
  }
</script>
