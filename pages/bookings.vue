<template>
  <main class="flex flex-col">
    
    <bookings-all />
    
    
    

  </main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    userBookings(){
      
    }
  },
methods: {
  ...mapActions(['getLocations', 'getTranslations' ]),
},  
mounted(){
  if (process.client) {
    this.getLocations()
    this.getTranslations()  
  }
  
  
  
  
},
  middleware: 'auth'
};</script>

