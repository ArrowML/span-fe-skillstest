<template>
  <section class="viewer" :class="{ loading: loading }">
    <div class="scroll-bar scroll-left" :class="{disabled: scroll == 0}" @click="scrollImages('left')">
      <font-awesome-icon icon="angle-left" />
    </div>
    <div class=viewer-container>
      <div class="images-board" :style="{ left: `${scroll}px`}">
        <div v-for="image of topic_images" :key=image.id class="image-card" :style="{ backgroundImage: 'url('+ image.urls.small +')' }"></div>
      </div>
    </div>
    <div class="scroll-bar scroll-right" @click="scrollImages('right')">
      <font-awesome-icon icon="angle-right" />
    </div>
  </section>
</template>

<script>
import UnsplashService from '../services/Unsplash'

export default {
  name: 'PhotoViewer',
  props: {
    service: UnsplashService,
    topic: String,
    nav_open: Boolean
  },
  data() {
    return {
      loading: true,
      current_topic: '',
      topic_images: [],
      scroll: 0,
      page: 1,
      column: 1,
      fetched_pages: []
    }
  },
  methods: {
    setTopicImages() {
      this.loading = true;
      this.service.getTopicPhotos(this.current_topic)
      .then(data => {
        this.topic_images = data;
        this.loading = false;
        this.fetched_pages = [1];
      });
    },
    scrollImages(direction) {
      const scroll_distance = 582;
      if (direction == 'right') {
        this.scroll -= scroll_distance ;
        this.page++;
        if (this.page%2 == 0) {
          this.column++;
          if (!this.fetched_pages.includes(this.column)) {
            this.service.getTopicPhotos(this.current_topic, this.column)
            .then(data => {
              this.topic_images.push(...data);
            });
          }
          this.fetched_pages.push(this.column);
          console.log(this.fetched_pages);
        }
      } 
      if (direction == 'left') {
        if (this.scroll != 0) {
          this.scroll += scroll_distance;
          this.page--;
          if (this.page%2 == 0) {
            this.column--;
          }
        }
      }
    }
  },
  watch: {
    topic(new_topic) {
      this.current_topic = new_topic;
      this.scroll = 0;
      this.page = 1;
      this.column = 1;
      this.setTopicImages();
    },
    nav_open(value) {
      this.loading = value;
    }
  }
}
</script>

<style scoped lang="scss">
  .viewer{
    display: flex;
    position: relative;
    &.loading {
      &::before {
        content: '';
        background-color: $shade-secondary;
        opacity: 0.6;
        position: absolute;
        width: 100%;
        height: calc(100vh - #{bu(8)});
        z-index: 10;
      }
    }
  }
  .scroll-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background-color: $shade-white;
    transition: all 0.5s;
    cursor: pointer;
    svg {
      position: relative;
      color: $colour-primary;
      width: bu(6);
      height: bu(6);
    }
    &.disabled {
      svg {
        color: $colour-secondary;
        opacity: 0.5;
      }
    }
    &.scroll-left {
      svg {
        left: bu(1);  
      }
      &:hover {
        svg {
          left: 0px;
          color: $shade-primary;
        }
      }
    }
    &.scroll-right {
      svg {
        right: bu(1);
      }
      &:hover {
        svg {
          right: 0px;
          color: $shade-primary;
        }
      }
    }
  }
  .viewer-container {
    height: calc(100vh - #{bu(8)});
    width: 1776px;
    background-color: $shade-white;
    padding: 16px;
    box-sizing: border-box;
    overflow: hidden;
    .images-board {
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      flex-wrap: wrap;
      height: inherit;
      position: relative;
      left: 0px;
      transition: left 0.25s;
      .image-card {
        width: 550px;
        flex: 0 0 44%;
        margin: 16px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        &:hover {
          box-shadow: 2px 6px 10px #5050506c;
        }
      }
    }

  }
</style>
