<template>
  <div class="w-full max-w-5xl mx-auto">
  <nav class=" z-40 top-0 inset-x-0 mx-auto max-w-7xl" aria-label="Main Menu">
    <ul class="flex pt-5">
    <li>
      <button  v-if="lang === 'nl'" class="btn block " @click="toggleLang">
        FR
      </button>
      <button  v-else class="btn block " @click="toggleLang">
      NL
    </button>
    </li>
      
      <li class="flex-1 ml-2">
        <nuxt-link class="btn block" :to="`/locations/peterpan.${lang}`">Peter Pan</nuxt-link>
      </li>
      <li class="flex-1 ml-2">
        <nuxt-link class="btn block" :to="`/locations/4saisons.${lang}`">4 Saisons</nuxt-link>
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
