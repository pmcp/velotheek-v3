<template>
  <main class="grid grid-cols-2 gap-4">
      <section>
        <h1>
          <span class="block text-xxl font-semibold ">{{ location.title }}</span>
        </h1>
      
        <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <nuxt-content :document="location" />
        </div>
      </section>
      <section>
        <calendar/>
        <moments class="my-5"/> 
      </section>    
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
head: {
link: [{
  rel: 'stylesheet',
  href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
}, ],
},
async asyncData({ $content, params, error }) {
  const location = await $content(`locations/${params.location}`).fetch()
  return {
    location,
  };
},
computed: {
locations() {
  return this.$store.getters.locations
},
activeLocationId(){
return this.$store.state.activeLocationId
}
},
methods: {
  ...mapActions(['setLocation', 'setActiveDate', 'addBookingToSelection']),
},
mounted(){
  this.setLocation(this.location.idInSheet)
  }
};
</script>
