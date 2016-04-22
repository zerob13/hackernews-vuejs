<template>
 <div class="news-item" v-show="it.hasOwnProperty('id')">
      <a class="title" :href="href">{{it.title}}</a>
      <span v-show="it | showDomain" class="domain">({{it.url | domain}})</span>
      <p class="subtext">
      <span  v-show="it.type | showInfo">
        {{it.score}} points by
        <a :href="'#/user/' + it.by">{{it.by}}</a>
      </span>
      {{it.time | fromNow}} ago
      <span  class="comments-link" v-show="it.type | showInfo">
        | <a :href="'#/item/' + it.id">{{it.descendants}} {{it.descendants | pluralize 'comment'}}</a>
      </span>
    </p>
    </div>
</template>
<script>
  export default {
    name: 'Item',
    props: {
      it: Object
    },
    computed: {
      href() {
        return this.it.url || ('#/item/' + this.it.id)
      }
    }
  }
</script>
