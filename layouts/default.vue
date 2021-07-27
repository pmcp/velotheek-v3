<template>
  <div class="">
    <!-- <Header class="w-full max-w-7xl mx-auto "/> -->
  
    <nuxt class="max-w-6xl mx-auto mb-40"/>
      
    <div v-if="sessionBookings.length > 0 "class="sticky top-100 w-full pb-8">
      <div class="max-w-6xl mx-auto flex items-center relative -top-40">
        <card position="bottom" class="w-full" open open-text="Close" close-text="Open" open-class="" close-class="">
          <template v-slot:opened >
            <session-bookings/>
          </template>    
          </card>
      </div>
    </div>
      
    
    
  </div>
</template>

<script>
  export default {
  
  computed: {
    sessionBookings(){
      return this.$store.state.sessionBookings
    },
   
  },
}
  </script>