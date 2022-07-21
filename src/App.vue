<template>
  <div id="app">
    <menu-pokemon></menu-pokemon>
    <router-view />
  </div>
</template>
<style lang="scss" src="./sass/app.scss">
</style>
<script>
import MenuPokemon from './components/MenuPokemon.vue';

export default {
  components: {
    MenuPokemon,
  },
}
</script>
