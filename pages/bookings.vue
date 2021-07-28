<template>
  <main class="flex flex-col mt-5">
    
    
    
      <h1 class="text-xl py-5"><translation :id="7"/></h1>
    <client-only>
    <bookings-all :bookings="userBookings"/>
  </client-only>    

  </main>
    
    
    
    

  
</template>

<script>
import { mapActions } from 'vuex';
// TODO: Importing vue here for the filter, don't know if this is good practice
import Vue from 'vue'
export default {
  computed: {
    userBookings(){
      if(this.$store.getters.userBookings)
      return Vue.filter('orderBy')(this.$store.getters.userBookings, 'date');
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
  // middleware: 'auth'
};</script>

