<template>
  <nav @click="toggleNav" :class="{ open: nav_open }">
     <ul class="topics">
        <li v-for="topic of topics" :key=topic.id @click.stop="setTopic(topic.slug, $event)"><span class="topic-icon">A</span> <span class="topic-text">{{ topic.title }}</span></li>
     </ul>
  </nav>
</template>

<script>
import UnsplashService from '../services/Unsplash'

export default {
  name: 'vNav',
  props: {
    service: UnsplashService
  },
  data() {
    return {
      nav_open: false,
      topics: {}
    }
  },
  emits: ['setTopic'],
  mounted() {
    const response = this.service.getTopics();
    response.then(data => {
      this.topics = data;
      this.$emit('setTopic', data[0].slug);
    });
  },
  methods:{
    toggleNav() {
      this.nav_open = !this.nav_open
    },
    setTopic(topic) {
      this.$emit('setTopic', topic)
    }
  }
}
</script>

<style scoped lang="scss">
  nav {
    flex-shrink: 0;
    width: bu(6);
    height: calc(100vh - #{bu(8)});
    background-color: $colour-secondary;
    transition: width 0.25s;
    overflow: hidden;
    color: #fff;
    &.open {
      width: bu(32);
    }
    ul.topics {
      padding: 0px;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      li {
        width: 100%;
        padding: bu(1) bu(2);
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin-bottom: bu(1);
        cursor: pointer;
        .topic-icon {
          font-weight: bold;
          width: bu(1);
          margin-right: bu(4);
        }
        .topic-text {
          white-space: nowrap;
        }
        &:hover {
          background-color: $shade-secondary;
        }
      }
    }
  }
</style>
