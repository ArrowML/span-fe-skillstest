<template>
  <vHeader :topic="selected_topic"></vHeader>
  <main>
      <vNav :service="unsplashService" @setTopic="setSelectedTopic" @navOpen="setNavState"></vNav>
      <PhotoViewer :service="unsplashService" :topic="selected_topic" :nav_open="nav_open"></PhotoViewer>
  </main>

</template>

<script>
import vHeader from './components/vHeader.vue'
import vNav from './components/vNav.vue'
import PhotoViewer from './components/PhotoViewer.vue'
import UnsplashService from './services/Unsplash'

export default {
  name: 'App',
  data() {
    return {
      unsplashService: null,
      selected_topic: '',
      nav_open: false
    }
  },
  components: {
    vHeader,
    vNav,
    PhotoViewer
  },
  beforeMount() {
    this.unsplashService = new UnsplashService();
  },
  methods:{
    setSelectedTopic(value) {
      this.selected_topic = value;
    },
    setNavState(value) {
      this.nav_open = value;
    }
  }
}

</script>

<style lang="scss">
  @import "./scss/_shared.scss";
  main {
    display: flex;
    width: 100%;
    overflow: hidden;
  }
</style>
