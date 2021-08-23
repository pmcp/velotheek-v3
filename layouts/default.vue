<template>
  <div class="relative max-w-6xl mx-auto mt-5">
    <div class="flex flex-row justify-end	">
      <main-navigation />
      <user />
      <language-toggle class="ml-5" />
    </div>


    <!-- <Header class="w-full max-w-7xl mx-auto "/> -->
    <div>
      <nuxt class=" mb-40" />
        <transition
        name="modal"
          enter-active-class="duration-300 ease-out opacity-0"
         enter-to-class="opacity-100"
         leave-active-class="duration-200 ease-in"
         leave-class="opacity-100"
         leave-to-class="opacity-0"
        >
        
      <div v-if="sessionBookings.length > 0 " class="sticky bottom-0 w-full pb-8 ">
        <div class=" flex items-center relative">
          <card position="bottom" class="w-full" open open-text="Close" close-text="Open" open-class="" close-class="">
            <template v-slot:opened>
              <bookings-session />
            </template>
          </card>
        </div>
      </div>
        </transition>
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