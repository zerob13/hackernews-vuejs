<template>
    <div class="user-view" v-show="user">
     <div class="progress" v-show="!userDataLoaded">
       <div class="indeterminate"></div>
     </div>
     <div class="user-card" v-show="userDataLoaded">
    <ul>
      <li><span class="label">user:</span> {{user.id}}</li>
      <li><span class="label">created:</span> {{user.created | fromNow}} ago</li>
      <li><span class="label">karma:</span> {{user.karma}}</li>
      <li>
        <span class="label">about:</span>
        <div class="about">
          <pre>
          {{{user.about}}}
          </pre>
        </div>
      </li>
    </ul>
    <p  v-show="userDataLoaded" class="links">
    <a :href="'https://news.ycombinator.com/submitted?id=' + user.id"><span>submissions</span></a>
    <a :href="'https://news.ycombinator.com/threads?id=' + user.id"><span>comments</span></a>
    </p>
    </div>
  </div>
</template>
<script>
  import hackapi from '../store/api.js'
  export default {
    name: 'userview',
    data: function() {
      return {
        user: {}
      }
    },
    route: {
      data: function(trans) {
        document.title = "User " + trans.to.params.id + " Profile";
        return {
          user: hackapi.fetchUser(trans.to.params.id)
        }
      }
    },
    computed: {
      userDataLoaded: function() {
        return this.user.hasOwnProperty('id');
      }
    }
  }
</script>
