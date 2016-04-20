<template>
<nav class="navbar">
  <div class="nav-wrapper">
    <div class="nav-logo left" href="#!/new">HackerNews</div>
    <ul class="right">
      <li><a v-link="{path:'new'}">new</a></li>
      <li><a v-link="{path:'top'}">top</a></li>
      <li><a v-link="{path:'show'}">show</a></li>
      <li><a v-link="{path:'ask'}">ask</a></li>
      <li><a v-link="{path:'job'}">jobs</a></li>
    </ul>
  </div>
</nav>
</template>
<script>
  export default {
    name: 'title-view',
    data: function() {
      return {}
    },
    methods: {}
  }
</script>
