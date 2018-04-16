<template>
  <div id="app">
    <transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
  body, html{
    min-height: 100vh;
    padding:0;
    margin:0;
  }
  #app{
    width:100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
</style>
