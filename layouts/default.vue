<template>
  <div class="relative max-w-6xl mx-auto mt-5">
    <div class="sticky top-0 z-20 bg-white pb-2">
      <div class="flex flex-row justify-end">
        <main-navigation />
        <user />
        <language-toggle class="ml-5" />
      </div>
    </div>

    <!-- <Header class="w-full max-w-7xl mx-auto "/> -->

      <nuxt class="min-h-screen" />

    <custom-transition :id="1">
    <div v-if="user" class="sticky bottom-0 w-full z-10">


      <div class=" flex items-center relative w-full">
        <bookings-session />
      </div>
    </div>
    </custom-transition>


  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

  export default {
  
  computed: {
    sessionBookings(){
      return this.$store.state.sessionBookings
    },

    ...mapGetters({
      user: 'auth/user'
    })
   
  },
    methods: {
      ...mapActions(['getLocations', 'getTranslations', 'getBookings' ]),
    },
    //TODO: Maybe better way of doing this? Don't know if I actually need it, as the state is being filled on nuxt generate
    mounted(){
      if (process.client) {
        this.getLocations()
        this.getTranslations()
        this.getBookings()
      }




    },

}
  </script>