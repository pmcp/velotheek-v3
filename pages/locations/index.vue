<template>
  <main class="flex flex-col">
      <locations />
    
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
      location
    };
  },
  computed: {
  locations() {
    return this.$store.getters.locations
  },
  },
  methods: {
    ...mapActions(['setLocation', 'setActiveDate', 'addBookingToSelection', 'getLocations', 'getTranslations','getBookings' ]),
  },
  mounted(){
    if (process.client) {
      this.getLocations()
      this.getTranslations() 
      this.getBookings()   
    }
    
    this.setLocation(this.location.idInSheet)
  },
    middleware: 'auth'
  };
  </script>
  
  