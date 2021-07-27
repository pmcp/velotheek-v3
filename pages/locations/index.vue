<template>
  <main class="flex flex-col">
      <locations />
    
  </main>
</template>
<script>
  
  
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
  activeLocationId(){
  return this.$store.state.activeLocationId
  }
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
  
  