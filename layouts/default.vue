<template>
  <div class="relative max-w-6xl mx-auto mt-5">
    <div class="flex flex-row justify-end	">
      <main-navigation />
      <user />
      <language-toggle class="ml-5" />
    </div>


    <!-- <Header class="w-full max-w-7xl mx-auto "/> -->
    <div>
      <nuxt class="mb-40" />
      <div v-if="sessionBookings.length > 0 " class=" bottom-0 w-full pb-8 ">
        <div class=" flex items-center relative">
          <card position="bottom" class="w-full" open open-text="Close" close-text="Open" open-class="" close-class="">
            <template v-slot:opened>
              <bookings-session />
            </template>
          </card>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
  
  computed: {
    sessionBookings(){
      return this.$store.state.sessionBookings
    },
   
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