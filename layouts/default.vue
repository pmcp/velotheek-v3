<template>
  <div class="relative max-w-6xl mx-auto mt-5">
    <div class="flex flex-row justify-end	">
      <main-navigation />
      <user />
      <language-toggle class="ml-5"/>
    </div>
  
  
    <!-- <Header class="w-full max-w-7xl mx-auto "/> -->
  <div class="w-full relative z-20">
  <div class="absolute top-0 right-10 mt-10">
    
    
  </div>
  </div>
    <nuxt class=" mb-40"/>
      
    <div v-if="sessionBookings.length > 0 "class="sticky top-100 w-full pb-8">
      <div class=" flex items-center relative -top-40">
        <card position="bottom" class="w-full" open open-text="Close" close-text="Open" open-class="" close-class="">
          <template v-slot:opened >
            <bookings-session/>
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