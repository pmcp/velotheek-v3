<template>
  <main>
    <section v-if="location" class="w-full max-w-5xl mx-auto">
      <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <locations />
        <div id="map"></div>
      </div>
      <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <div class="text-lg max-w-prose mx-auto">
          <h1>
            <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">{{ location.title }}</span>
          </h1>
        </div>
          <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
          <nuxt-content :document="location" />
        </div>
        </div>
        <div>
        <calendar/>
        <session-bookings/>
        <moments /> 
      
        <button @click="addBookingToSelection">
          Voeg toe
        </button>
      
        <button @click="createBooking">
          Maak boeking
        </button>
      </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css',
      },
    ],
},

  async asyncData({ $content, params, error }) {
    const location = await $content(`locations/${params.location}`).fetch()
    return {
      location,
    };
  },
  methods: {
    ...mapActions(['setLocation', 'setActiveDate', 'addBookingToSelection', 'createBooking']),
},
  mounted(){  
    
    
    const mapboxgl = require('mapbox-gl')
    
    
    const locationOnMap = JSON.parse(this.location.location)
    
    const map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoicG1jcCIsImEiOiJja3JmMWY4emswdDloMnBvZXhsbTh4OXBrIn0.xOUAdPFdzCU9sSsBbsE-7g',
      container: 'map', 
          style: 'mapbox://styles/mapbox/streets-v9',
          center: locationOnMap.coordinates, // starting position as [lng, lat]
          zoom: 13
   })
   
   
  new mapboxgl.Marker()
      .setLngLat(locationOnMap.coordinates)
      // .setPopup(this.location.description)
      .addTo(map) // Initialized above
   
    
    // Set date to today, so we can show calendar on today
    this.setActiveDate(new Date())
    
    // Get the location based on the id we are using in the database (google sheet)
    this.setLocation(this.location.idInSheet)
  }
};
</script>
