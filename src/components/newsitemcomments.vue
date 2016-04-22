<template>
  <li v-show="comment.text" class="item-comment">
    <div class="comhead">
      <a class="toggle" @click="open = !open">{{open ? '[-]' : '[+]'}}</a>
      <a :href="'#/user/' + comment.by">{{comment.by}}</a>
      {{comment.time | fromNow}} ago
    </div>
    <p class="comment-content" v-show="open">
      {{{comment.text}}}
    </p>
    <ul class="child-comments" v-if="comment.kids" v-show="open">
      <comment v-for="comment in childComments" :comment="comment"></comment>
    </ul>
  </li>
</template>
<script>
  import hackapi from '../store/api.js'
  export default {
    name: 'Comment',
    props: {
      comment: Object
    },
    data: function() {
      return {
        childComments: [],
        open: true
      }
    },
    created: function() {
      if (this.comment.kids) {
        hackapi.fetchItems(this.comment.kids).then(comments => {
          this.childComments = comments
        })
      }
    }
  }
</script>
