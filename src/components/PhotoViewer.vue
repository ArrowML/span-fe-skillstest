<template>
  <div class=viewer-container :class="{ loading: loading }">
    <div v-for="photo of topic_photos" :key=photo.id class="photo-card" :style="{ backgroundImage: 'url('+ photo.urls.small +')' }"></div>
  </div>
</template>

<script>
import UnsplashService from '../services/Unsplash'

export default {
  name: 'HelloWorld',
  props: {
    service: UnsplashService,
    topic: String
  },
  data() {
    return {
      loading: true,
      topic_photos: []
    }
  },
  methods: {
    setTopicImages(topic) {
      this.loading = true;
      this.service.getTopicPhotos(topic)
      .then(data => {
        this.topic_photos = data
      });
    }
  },
  watch: {
    topic(new_topic){
      this.setTopicImages(new_topic);
    }
  }
}
</script>

<style scoped lang="scss">
  .viewer-container {
    width: 2000px;
    flex-shrink: 0;
    height: calc(100vh - #{bu(8)});
    background-color: #ecf0f1;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 16px;
    box-sizing: border-box;
    &.loading {
      background-color: antiquewhite;
    }
    .photo-card {
      width: 384px;
      flex: 0 0 46%;
      margin: 16px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
</style>
