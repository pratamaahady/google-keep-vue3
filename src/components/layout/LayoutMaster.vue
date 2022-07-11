<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <Sidebar :hide="hideSidebar"></Sidebar>
    <div class="content">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import Navbar from './_partials/Navbar.vue';
import Sidebar from './_partials/Sidebar.vue';

export default {
  name: "App",
  components: { Navbar, Sidebar },
  data(){
    return{
      hideSidebar: false,
    }
  },
  methods:{
  },
  created(){
    this.emitter.on('sidebar-toggle', () => {
      this.hideSidebar = !this.hideSidebar
    })
  }
}
</script>

<style lang="scss">
body{
  background: $body-background;
  color: $body-color;
  font-family: $ff-roboto;

  header{
    height: $header-height;
  }

  main{
    position: relative;
    display: flex;
    min-height: calc(100vh - $header-height);

    .content{
      width: 100%;
      transition: $transition;
      padding: 2rem;
    }
  }
}
</style>