<template>
  <nav @click="toggleNav" :class="{ open: nav_open }">
    <div class="nav-toggle">
      <font-awesome-icon icon="bars" />
    </div>
    <ul class="topics">
      <li v-for="topic of topics" :key=topic.id @click.stop="setTopic(topic.slug, $event)"><span class="topic-icon"><font-awesome-icon :icon=iconMap[topic.slug] /></span> <span class="topic-text">{{ topic.title }}</span></li>
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
      topics: {},
      iconMap: {
        'interiors' : 'home',
        'street-photography' : 'camera',
        'technology' : 'microchip',
        'travel' : 'passport',
        'textures-patterns' : 'swatchbook',
        'covid-19' : 'virus',
        'animals' : 'paw',
        'food-drink' : 'utensils',
        'athletics' : 'running',
        'spirituality' : 'book',
      }
    
    }
  },
  emits: ['setTopic', 'navOpen'],
  mounted() {
    const response = this.service.getTopics();
    response.then(data => {
      this.topics = data;
      this.$emit('setTopic', data[0].slug);
    });
  },
  methods:{
    toggleNav(action = 'toggle') {
      if(action == 'close') {
        this.nav_open = false;
      } else {
        this.nav_open = !this.nav_open;
      }
      this.$emit('navOpen', this.nav_open);
    },
    setTopic(topic) {
      this.$emit('setTopic', topic);
      this.toggleNav('close');
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
    position: relative;
    &.open {
      width: bu(32);
      .nav-toggle {
        svg {
          transform: rotate(180deg);
        }
      }
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
    .nav-toggle {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: bu(6) 0px;
      &:hover {
        color: $colour-primary;
      }
      svg {
        transition: all 0.25s;
        height: bu(2);
        width: bu(2);
      }
    }
  }
</style>
