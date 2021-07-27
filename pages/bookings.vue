<template>
  <main class="flex flex-col">
    
    <bookings-all :bookings="userBookings"/>
    
    
    

  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    userBookings(){
      return this.$store.getters.userBookings
    }
  },
methods: {
  ...mapActions(['getLocations', 'getTranslations', 'getBookings' ]),
},  
mounted(){
  if (process.client) {
    this.getLocations()
    this.getTranslations()  
    this.getBookings()  
  }
  
  
  
  
},
  middleware: 'auth'
};</script>

