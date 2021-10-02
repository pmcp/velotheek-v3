<template>
  <div class="w-full max-w-5xl mx-auto">
  <nav class=" z-40 top-0 inset-x-0 mx-auto max-w-7xl" aria-label="Main Menu">
    <ul class="flex pt-5">
      <li>
        <ColorModePicker />
      </li>
    <li>
      <language-toggle />
    </li>
      
      <li class="flex-1 ml-4">
        <nuxt-link class="btn block" to="/locations/peterpan.nl">Peter Pan</nuxt-link>
      </li>
      <li class="flex-1 ml-2">
        <nuxt-link class="btn block" :to="`/locations/4saisons.${lang}`">4 Saisons</nuxt-link>
      </li>
    <li class="ml-4">
      <user />
    </li>
    </ul>
  </nav>
  </div>
</template>

<script>
  export default {
    computed: {
      lang(){
        return this.$store.state.lang
      },
    },
    
  }
</script>
