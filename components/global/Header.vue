<template>
  <div>
    <button @click="toggleLang">{{ lang }} </button>
  <nav class=" z-40 top-0 inset-x-0 mx-auto max-w-7xl" aria-label="Main Menu">
    <ul class="flex pt-5">
      
      <li class="flex-1 ml-2">
        <nuxt-link class="btn block w-28 " to="/">Projecten</nuxt-link>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
  export default {
    computed: {
      lang(){
        return this.$store.state.lang
      },
    },
    methods: {
       ...mapActions(['toggleLang']),
    }
  }
</script>
