<template>
  <header>
    <div class="topic-text"><h2>{{ topic }}</h2></div>
  </header>
</template>

<script>
export default {
  name: 'vHeader',
  props: {
    topic: String
  }
}
</script>

<style scoped lang="scss">
header {
  background-color: $colour-primary;
  width: 100%;
  min-height: bu(8);
  .topic-text {
    padding: bu(2);
    height: bu(4);
    h2{
      text-transform: capitalize;
      color: $colour-white;
      margin: 0px;
      text-align: center;
      font-weight: 600;
    }
  }
}
</style>
