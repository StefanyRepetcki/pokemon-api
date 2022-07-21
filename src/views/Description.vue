<template>
  <div class="description">
    <description-pokemon :id="id"></description-pokemon>
  </div>
</template>

<script>
import DescriptionPokemon from '../components/DescriptionPokemon.vue';

export default {
  components: {
    DescriptionPokemon
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
}
</script>
