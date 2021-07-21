<template>
  <main>
    <section v-if="location" class="w-full max-w-5xl mx-auto">
      <div class="text-lg max-w-prose mx-auto">
        <!-- TODO: kaart mapbox-->
        <h1>
          <span class="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">{{ location.title }}</span>
        </h1>
       {{ location }}
      </div>
      <div class="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
        <nuxt-content :document="location" />
        
      </div>
      
      <calendar/>
      <session-bookings/>
      <moments /> 
      <button @click="addBooking">
        Voeg toe
      </button>
      
      
      <button @click="createBookings">
        Maak boeking
      </button>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  
  async asyncData({ $content, params, error }) {
    const location = await $content(`locations/${params.location}`).fetch()
    return {
      location,
    };
  },
  methods: {
    ...mapActions(['setLocation', 'setActiveDate', 'addBooking', 'createBookings']),
},
  mounted(){
    
    
    // Set date to today, so we can show calendar on today
    this.setActiveDate(new Date())
    
    // Get the location based on the id we are using in the database (google sheet)
    this.setLocation(this.location.idInSheet)
  }
};
</script>
