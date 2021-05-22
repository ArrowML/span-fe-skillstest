<template>
  <vHeader></vHeader>
  <main>
      <vNav :service="unsplashService" @setTopic="setSelectedTopic" ></vNav>
      <PhotoViewer :service="unsplashService" :topic="selected_topic"></PhotoViewer>
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
      selected_topic: ''
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
